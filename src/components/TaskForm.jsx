import React, { useContext, useEffect, useState } from "react";
import { setDoc, deleteDoc, doc, collection } from "firebase/firestore";
import { ref, uploadBytes, deleteObject, listAll } from "firebase/storage";
import { FireCtx } from "../index.js";
import { getConvertedDate } from "../utils/getConvertedDate.js";

/**
 * Форма с полями ввода, спискомвложенных файлов и контроллерами
 * @param {object} props всё теже данные, проброшенные из родительского таска:
 * "closefunc" - род.функция закрытия формы,
 * "isMother"{boolean} - меняет контроллеры формы (при TRUE нельзя удалить и делать предпросмотр),
 * остальное опционально.
 */
export const TaskForm = (props) => {
	const { closefunc } = props;
	const isMother = props.isMother ? true : false;
	const { firestore, storage } = useContext(FireCtx);

	////////////////////////
	// STATES
	////////////////////////
	const [title, setTitle] = useState(
		props.title ? (isMother ? "" : props.title) : ""
	);
	const [desc, setDesc] = useState(props.description ? props.description : "");
	const [date, setDate] = useState(props.date ? props.date : "");
	const [files, setFiles] = useState(props.files ? props.files : "");
	const [completed, setCompleted] = useState(props.completed ? true : false);

	const [edit, setEdit] = useState(false);
	const [lfiles, setLfiles] = useState([]);

	/**
	 * Подгрузка вложенных файлов из storage
	 */
	useEffect(() => {
		if (!isMother) {
			if (files && lfiles.length === 0) {
				downloadFiles(props.id);
			}
		}
	}, [lfiles]);

	////////////////////////
	// FORM HANDLERS
	////////////////////////
	function handleTitleChange(e) {
		setTitle(e.target.value);
	}
	function handleDescChange(e) {
		setDesc(e.target.value);
	}
	function handleDateChange(e) {
		setDate(e.target.value);
	}
	function handleFilesChange(e) {
		setFiles(e.target.files);
	}
	function handleCheckboxChange(e) {
		setCompleted(e.target.checked);
	}

	/**
	 * Передаёт путь до файла в функцию удаления из storage
	 */
	function handleDeleteFile(e) {
		e.preventDefault();
		deleteStorageFile(`${props.id}/${e.target.name}`, props.id);
	}

	/**
	 * Загружает файлы таска и  передаёт их в состояние компонента в "lfiles"
	 * @param {string} id уникальный номер задачи (строковая дата)
	 */
	function downloadFiles(id) {
		const listRef = ref(storage, id);
		const list = [];
		listAll(listRef)
			.then((res) => {
				res.items.forEach((itemRef) => {
					list.push(itemRef.name);
				});
				setLfiles(list);
				return;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	/**
	 * Загружает в storage список выбранных файлов
	 * @param {object} obj список выбранных файлов
	 * @param {string} id уникальный номер задачи (строковая дата)
	 */
	function uploadFiles(obj, id) {
		for (const file in Object.values(obj)) {
			const storageRef = ref(storage, `${id}/${obj[file].name}`);
			uploadBytes(storageRef, file);
		}
	}

	/**
	 * Удаляет только один(1) файл из storage
	 * @param {string} path путь до файла в storage
	 * @param {string} id уникальный номер задачи (строковая дата)
	 */
	function deleteStorageFile(path, id) {
		const desertRef = ref(storage, path);
		deleteObject(desertRef)
			.then(() => {
				downloadFiles(id);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	////////////////////////
	// TASK CONTROLS
	////////////////////////

	const handleClose = (e) => {
		e.preventDefault();
		closefunc(false);
	};

	/**
	 * Включает режим редактирования
	 */
	const handleEdit = (e) => {
		e.preventDefault();
		setEdit(true);
	};

	/**
	 * Сохранение и отправкаданных в firebase
	 *
	 */
	const handleSave = async (e) => {
		e.preventDefault();
		if (isMother) {
			closefunc(false);
		} else {
			setEdit(false);
		}
		const id = props.id ? props.id : new Date().toISOString();
		const validDate = date === "" ? getConvertedDate(Date.now()) : date;
		const newTask = {
			id: id,
			title: title,
			description: desc,
			date: validDate,
			files: files ? true : false,
			completed: completed,
		};
		if (files) uploadFiles(files, id);
		const docRef = doc(collection(firestore, "tasks"), id);
		await setDoc(docRef, newTask, { merge: true });
	};

	/**
	 * Удаление задачи и вложенных файлов из firebase
	 */
	const handleDelete = async (e) => {
		e.preventDefault();
		await deleteDoc(doc(firestore, "tasks", props.id));
		if (lfiles.length > 0) {
			lfiles.forEach((filename) => {
				deleteStorageFile(`${props.id}/${filename}`, props.id);
			});
		}
		closefunc(false);
	};

	return (
		<form className="taskform">
			<input
				placeholder="title"
				type={"text"}
				value={title}
				disabled={!isMother && !edit}
				onChange={handleTitleChange}
			/>
			<textarea
				placeholder="description"
				value={desc}
				disabled={!isMother && !edit}
				onChange={handleDescChange}
				rows="4"
			/>
			<input
				type={"date"}
				placeholder="date"
				value={date}
				disabled={!isMother && !edit}
				onChange={handleDateChange}
			/>
			<input
				type={"file"}
				disabled={!isMother && !edit}
				onChange={handleFilesChange}
				multiple
				accept=".png, .jpg, .jpeg .txt"
			/>
			{lfiles.length > 0 && (
				<ul className="filelist">
					{lfiles.map((file, index) => (
						<li key={index}>
							{edit && (
								<button
									name={file}
									onClick={handleDeleteFile}
									className="taskform__btnX"
								>
									X
								</button>
							)}
							{file}
						</li>
					))}
				</ul>
			)}

			<div>
				<input
					type={"checkbox"}
					checked={completed}
					disabled={!isMother && !edit}
					onChange={handleCheckboxChange}
				/>
				<span>Task completed?</span>
			</div>

			<div className="taskform__controls">
				{isMother ? (
					<>
						<button onClick={handleSave} className="taskform__btn">
							Save
						</button>
					</>
				) : (
					<>
						{edit ? (
							<button onClick={handleSave} className="taskform__btn">
								Save
							</button>
						) : (
							<button onClick={handleEdit} className="taskform__btn">
								Edit
							</button>
						)}
						<button onClick={handleDelete} className="taskform__btn">
							Delete
						</button>
					</>
				)}
				<button onClick={handleClose} className="taskform__btn">
					Close
				</button>
			</div>
		</form>
	);
};

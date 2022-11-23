import React from "react";
//import "../style.less";

export const TaskForm = ({ closefunc }) => {
	const handleAdd = (e) => {
		e.preventDefault();
	};
	const handleClose = () => {
		closefunc(false);
	};

	return (
		<form className="taskform">
			<input type={"text"} name="title" placeholder="title" />
			<textarea name="description" placeholder="description" rows="4" />
			<input type={"date"} name="finish date" placeholder="date" />
			<input type={"file"} name="files" />
			<div>
				<input type={"checkbox"} name="checkbox" />
				<span>Task complited?</span>
			</div>
			<div className="taskform__controls">
				<button onClick={handleAdd} className="taskform__btn">
					Add
				</button>
				<button onClick={handleClose} className="taskform__btn">
					Close
				</button>
			</div>
		</form>
	);
};

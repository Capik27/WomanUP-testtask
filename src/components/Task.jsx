import React, { useState } from "react";
import { TaskForm } from "./TaskForm";
import { getConvertedDate } from "../utils/getConvertedDate.js";

/**
 * @param {object} props произвольные данные (приходящие с бэкенда),
 * "props.isMother" если задать TRUE, то компонент будет материнским:
 * т.е. пропадёт опция удаления и предпросмотра
 */
export const Task = (props) => {
	const [pressed, setPressed] = useState(false);

	/**
	 * Меняет состояние компонента из минимизированного в открытую форму
	 */
	const handleClick = () => {
		setPressed(true);
	};

	/**
	 * Сравнивает дату дедлайна из таска с текущей клиентской и выдаёт нужный класс
	 * @param {object} state Является тем же родительским пропсом, требуются из него
	 * только ключи "comleted" и "date"
	 * @returns {string} строка с именами стилевых классов
	 */
	const getTaskClassName = (state) => {
		const mainclass = "tasklist__item";
		if (state.completed) return mainclass + " completed";
		const today = getConvertedDate(Date.now());
		const deadline = state.date;
		if (today > deadline) return mainclass + " failed";
		return mainclass;
	};

	return (
		<>
			{!pressed && (
				<button
					onClick={handleClick}
					className={!props.isMother ? getTaskClassName(props) : ""}
				>
					{props.title}
				</button>
			)}
			{pressed && (
				<TaskForm closefunc={setPressed} isMother={props.isMother} {...props} />
			)}
		</>
	);
};

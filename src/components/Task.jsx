import React, { useState } from "react";
import { TaskForm } from "./TaskForm";
import { getConvertedDate } from "../utils/getConvertedDate.js";

export const Task = (props) => {
	const [pressed, setPressed] = useState(false);

	const handleClick = () => {
		setPressed(true);
	};

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

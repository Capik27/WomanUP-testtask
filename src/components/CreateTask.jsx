import React, { useState } from "react";
import { TaskForm } from "./TaskForm";

export const CreateTask = () => {
	const [pressed, setPressed] = useState(false);

	const handleClick = () => {
		setPressed(true);
	};

	return (
		<>
			<button onClick={handleClick} disabled={pressed}>
				Create task
			</button>
			{pressed && <TaskForm closefunc={setPressed} />}
		</>
	);
};

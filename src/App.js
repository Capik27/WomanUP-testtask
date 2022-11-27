import "./style.less";
import { Task } from "./components/Task";
import { TaskList } from "./components/TaskList";

function App() {
	return (
		<div className="container">
			<Task title={"Create task"} isMother={true} />
			<TaskList />
		</div>
	);
}

export default App;

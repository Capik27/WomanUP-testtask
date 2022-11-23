import './style.less';
import { CreateTask } from './components/CreateTask';
import { TaskList } from './components/TaskList';

function App() {

  return (
    <div className='container'>
      <CreateTask/>
      <TaskList/>
    </div>
  );
}

export default App;

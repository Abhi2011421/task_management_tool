import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const App = () => {
  return (
    <TaskProvider>
      <div className="app">
        <ThemeToggle />
        <h1>Task Manager</h1>
        <TaskForm />
        <FilterButtons />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default App;
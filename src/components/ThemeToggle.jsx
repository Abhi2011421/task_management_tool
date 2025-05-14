import { useTasks } from '../context/TaskContext';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTasks();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="theme-toggle"
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
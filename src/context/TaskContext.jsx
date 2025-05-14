import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Task functions
  const addTask = (text, dueDate = null, priority = 'medium', category = '') => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      dueDate,
      priority,
      category,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText, newDueDate, newPriority, newCategory) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: newText,
              dueDate: newDueDate,
              priority: newPriority,
              category: newCategory
            }
          : task
      )
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  // Filter and sort tasks
  const categories = ['all', ...new Set(tasks.map((task) => task.category).filter(Boolean))];

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    if (selectedCategory !== 'all' && task.category !== selectedCategory) return false;
    if (searchTerm && !task.text.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return new Date(b[sortBy]) - new Date(a[sortBy]);
  });

  // Dark mode effect
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  return (
    <TaskContext.Provider
      value={{
        tasks: sortedTasks,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
        onDragEnd,
        filter,
        setFilter,
        sortBy,
        setSortBy,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        categories,
        darkMode,
        setDarkMode
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
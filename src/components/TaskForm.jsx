import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskForm = () => {
  const { addTask } = useTasks();
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText, dueDate || null, priority, category);
      setTaskText('');
      setDueDate('');
      setPriority('medium');
      setCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task..."
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category (optional)"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
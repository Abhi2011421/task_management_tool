import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { useTasks } from '../context/TaskContext';

const TaskItem = ({ task, index }) => {
  const { toggleTask, deleteTask, editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editCategory, setEditCategory] = useState(task.category || '');

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editTask(task.id, editText, editDueDate || null, editPriority, editCategory);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}
        >
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="edit-form">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                required
              />
              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input
                type="text"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                placeholder="Category"
              />
              <div className="edit-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <div className="task-content">
                <span className="task-text">{task.text}</span>
                <div className="task-meta">
                  {task.dueDate && (
                    <span className="due-date">
                      📅 {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  {task.priority !== 'medium' && (
                    <span className="priority-indicator">
                      {task.priority}
                    </span>
                  )}
                  {task.category && (
                    <span className="category-tag">{task.category}</span>
                  )}
                </div>
              </div>
              <div className="task-actions">
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => deleteTask(task.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      )}
    </Draggable>
  );
};

export default TaskItem;
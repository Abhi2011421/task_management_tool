import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import TaskItem from './TaskItem';
import { useTasks } from '../context/TaskContext';

const TaskList = () => {
  const { tasks, onDragEnd } = useTasks();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
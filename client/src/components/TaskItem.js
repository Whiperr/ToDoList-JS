import React from 'react';

function TaskItem({ task, onDelete, onToggle }) {
    return (
        <li className={task.completed ? 'done' : ''}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id, task.completed)}
            />
            <span>{task.title}</span>
            <button onClick={() => onDelete(task.id)}>Usuń</button>
        </li>
    );
}

export default TaskItem;
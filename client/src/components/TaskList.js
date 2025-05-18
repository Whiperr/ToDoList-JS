import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onToggle }) {
    return (
        <ul>
            {tasks.map(task => (
                <label><TaskItem
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onToggle={onToggle}
                /></label>
            ))}
        </ul>
    );
}

export default TaskList;
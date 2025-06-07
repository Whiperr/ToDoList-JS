import React, { useState } from 'react';

function TaskItem({ task, onDelete, onToggle, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const handleSave = () => {
        if (newTitle.trim()) {
            onEdit(task.id, newTitle); // Wywołaj funkcję edycji z rodzica
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setNewTitle(task.title); // Przywróć oryginalny tytuł
        }
    };

    return (
        <li className={task.completed ? 'done' : ''}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />

            {isEditing ? (
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSave} // Zapisz, gdy pole straci fokus
                    autoFocus
                />
            ) : (
                <span onDoubleClick={() => setIsEditing(true)}>{task.title}</span>
            )}

            <div>
                {isEditing ? (
                    <button onClick={handleSave}>Zapisz</button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edytuj</button>
                )}
                <button onClick={() => onDelete(task.id)}>Usuń</button>
            </div>
        </li>
    );
}

export default TaskItem;
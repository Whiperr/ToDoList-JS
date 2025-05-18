import React, { useState } from 'react';

function TaskForm({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nowe zadanie"
                value={text}
                onChange={e => setText(e.target.value)}
                required
            />
            <button type="submit">Dodaj</button>
        </form>
    );
}

export default TaskForm;
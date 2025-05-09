const db = require('../db/database');

// Pobierz wszystkie zadania
exports.getAllTasks = () => {
    const stmt = db.prepare('SELECT * FROM tasks');
    return stmt.all().map(row => ({
        ...row,
        completed: !!row.completed
    }));
};

// Dodaj nowe zadanie
exports.createTask = ({ title }) => {
    const stmt = db.prepare('INSERT INTO tasks (title) VALUES (?)');
    const info = stmt.run(title);
    return {
        id: info.lastInsertRowid,
        title,
        completed: false
    };
};

// Aktualizuj zadanie
exports.updateTask = (id, data) => {
    const task = exports.getTaskById(id);
    if (!task) throw new Error('Task not found');

    const updatedTitle = data.title ?? task.title;
    const updatedCompleted = data.completed ?? task.completed;

    const stmt = db.prepare('UPDATE tasks SET title = ?, completed = ? WHERE id = ?');
    stmt.run(updatedTitle, updatedCompleted ? 1 : 0, id);

    return { id, title: updatedTitle, completed: !!updatedCompleted };
};

// Usuń zadanie
exports.deleteTask = (id) => {
    const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
    stmt.run(id);
};

// Pobierz jedno zadanie (pomocniczo)
exports.getTaskById = (id) => {
    const stmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
    const task = stmt.get(id);
    if (!task) return null;
    return { ...task, completed: !!task.completed };
};

const taskModel = require('../models/taskModel');

// Pobierz wszystkie zadania
exports.getTasks = (req, res) => {
    const tasks = taskModel.getAllTasks();
    res.json(tasks);
};

// Dodaj nowe zadanie
exports.createTask = (req, res) => {
    const newTask = taskModel.createTask(req.body);
    res.status(201).json(newTask);
};

// Aktualizuj zadanie
exports.updateTask = (req, res) => {
    const updatedTask = taskModel.updateTask(req.params.id, req.body);
    res.json(updatedTask);
};

// Usuń zadanie
exports.deleteTask = (req, res) => {
    taskModel.deleteTask(req.params.id);
    res.status(204).send();
};

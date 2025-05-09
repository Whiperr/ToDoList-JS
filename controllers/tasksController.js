const taskModel = require('../models/taskModel');

exports.getTasks = (req, res, next) => {
    try {
        const tasks = taskModel.getAllTasks();
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

exports.createTask = (req, res, next) => {
    try {
        const task = taskModel.createTask(req.body);
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
};

exports.updateTask = (req, res, next) => {
    try {
        const task = taskModel.updateTask(req.params.id, req.body);
        res.json(task);
    } catch (err) {
        next(err);
    }
};

exports.deleteTask = (req, res, next) => {
    try {
        taskModel.deleteTask(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

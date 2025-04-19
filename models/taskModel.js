const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/tasks.json');

// Pomocnicze funkcje
const loadTasks = () => {
    const fileData = fs.readFileSync(dataPath);
    return JSON.parse(fileData);
};

const saveTasks = (tasks) => {
    fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
};

exports.getAllTasks = () => {
    return loadTasks();
};

exports.createTask = (taskData) => {
    const tasks = loadTasks();
    const newTask = {
        id: Date.now().toString(),
        title: taskData.title,
        completed: false
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
};

exports.updateTask = (id, taskData) => {
    const tasks = loadTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    tasks[index] = { ...tasks[index], ...taskData };
    saveTasks(tasks);
    return tasks[index];
};

exports.deleteTask = (id) => {
    let tasks = loadTasks();
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);
};

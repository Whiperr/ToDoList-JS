const API_URL = '/api/tasks';
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');

let currentFilter = 'all';

taskForm.addEventListener('submit', addTask);
document.querySelectorAll('#filters button').forEach(btn => {
    btn.onclick = () => {
        currentFilter = btn.dataset.filter;
        fetchTasks();
    };
});

async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    taskList.innerHTML = '';
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleCompleted(task.id, checkbox.checked);

        const span = document.createElement('span');
        span.textContent = task.title;
        span.contentEditable = true;
        span.onblur = () => updateTitle(task.id, span.textContent.trim());

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Usuń';
        deleteBtn.onclick = () => deleteTask(task.id);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'task-content';
        contentDiv.appendChild(checkbox);
        contentDiv.appendChild(span);

        li.appendChild(contentDiv);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

async function addTask(e) {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });

    taskInput.value = '';
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

async function toggleCompleted(id, completed) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
    });
    fetchTasks();
}

async function updateTitle(id, title) {
    if (!title) return;
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    fetchTasks();
}

fetchTasks();

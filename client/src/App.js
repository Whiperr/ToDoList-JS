import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'done'

  // Ta funkcja pozostaje bez zmian
  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Błąd pobierania danych');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Nie udało się pobrać zadań:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Ta funkcja pozostaje bez zmian
  const addTask = async (text) => {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: text })
    });
    fetchTasks();
  };

  // Ta funkcja pozostaje bez zmian
  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  // Ta funkcja pozostaje bez zmian
  const toggleTask = async (id, completed) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    });
    fetchTasks();
  };


  const editTask = async (id, newTitle) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }) // Wysyłamy nowy tytuł
    });
    fetchTasks(); // Odświeżamy listę zadań
  };


  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'done') return task.completed;
    return true;
  });

  return (
      <div className="App">
        <h1>Lista zadań</h1>
        <TaskForm onAdd={addTask} />

        <div className="filters">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Wszystkie</button>
          <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Aktywne</button>
          <button onClick={() => setFilter('done')} className={filter === 'done' ? 'active' : ''}>Zakończone</button>
        </div>

        {/* ZMIANA: Dodajemy 'onEdit' do TaskList */}
        <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onToggle={toggleTask}
            onEdit={editTask}
        />
      </div>
  );
}

export default App;
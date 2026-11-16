'use client';
import { useState } from 'react';

export default function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskTitle.trim() === '') {
      setErrorMessage('Task title cannot be empty!');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setErrorMessage('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white', color: 'black', padding: '40px' }}>
      <div style={{ maxWidth: '450px', margin: '0 auto', border: '2px solid #0d9488', borderRadius: '10px', padding: '20px' }}>
        <h2 style={{ color: '#0d9488' }}>Task Tracker</h2>

        <form onSubmit={handleAddTask} style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Enter a task..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            style={{ padding: '8px', width: '68%', marginRight: '8px', background: 'white', color: 'black', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '8px 14px', background: '#0d9488', color: 'white', border: 'none', borderRadius: '5px' }}>
            Add Task
          </button>
        </form>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <h3>My Tasks</h3>

        {tasks.length === 0 ? (
          <p style={{ color: 'gray' }}>No tasks added yet. Start by creating one above!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks.map((task) => (
              <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <span
                  onClick={() => toggleTask(task.id)}
                  style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                >
                  {task.title}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{ background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px' }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
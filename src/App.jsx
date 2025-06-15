import React, { useEffect, useState,useRef } from 'react';
import Board from './components/Board';
import Lane from './components/Lane';
import styles from './styles/Board.module.css';
import {
  loadTodos,
  handleAddInline,
  handleUpdateInline,
  handleDelete,
  handleDrop,
  handleDragStart
} from './utils/todoHandlers';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const hasLoaded = useRef(false);

    useEffect(() => {
    // React 18 Strict Mode double-invokes useEffect in development to help catch side effects.
    // The hasLoaded ref ensures loadTodos only runs once on initial mount, even in Strict Mode.
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    (async () => {
      try {
        await loadTodos(setTodos);
        setError(null);
      } catch (err) {
        setError('Failed to load todos. Please try again later.');
      }
    })();
  }, []);

  const lanes = [
    {
      type: 'Pending',
      title: 'Pending',
      filter: t => t.status === 'Pending',
    },
    {
      type: 'In Progress',
      title: 'In Progress',
      filter: t => t.status === 'In Progress',
    },
    {
      type: 'Completed',
      title: 'Completed',
      filter: t => t.status === 'Completed',
    },
  ];

  // Error boundary for handlers
  const safeHandler = handler => async (...args) => {
    try {
      await handler(...args);
      setError(null);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.mainTitle}>Kanban Task Board</h1>
      {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '1rem'}}>{error}</div>}
      <Board
        lanes={lanes.map(lane => (
          <Lane
            key={lane.type}
            title={lane.title}
            laneType={lane.type}
            onDrop={safeHandler((e, status) => handleDrop(e, status, todos, setTodos))}
            onAdd={safeHandler(todo => handleAddInline(todo, setTodos))}
            onUpdate={safeHandler(todo => handleUpdateInline(todo, setTodos))}
            onDelete={safeHandler(id => handleDelete(id, setTodos))}
            todos={todos.filter(lane.filter)}
            onDragStart={handleDragStart}
          />
        ))}
      />
    </div>
  );
};

export default App;

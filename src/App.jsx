import React, { useEffect, useState, useRef, useCallback } from 'react';
import Board from './components/Board';
import Lane from './components/Lane';
import styles from './styles/Board.module.css';
import {
  loadTodosPaginated,
  handleAddInline,
  handleUpdateInline,
  handleDelete,
  handleDrop,
  handleDragStart
} from './utils/todoHandlers';

const LIMIT = 10;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // <-- use state for loading
  const hasLoaded = useRef(false);

  // Infinite scroll fetch
  const fetchMoreTodos = useCallback(async (append = false) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const fetched = await loadTodosPaginated({ setTodos, limit: LIMIT, skip: append ? skip : 0, append });
      setError(null);
      if (fetched < LIMIT) setHasMore(false);
      if (append) setSkip(prev => prev + fetched);
      else setSkip(fetched);
    } catch (err) {
      setError('Failed to load todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [setTodos, skip, hasMore, loading]);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    fetchMoreTodos(false);
    // eslint-disable-next-line
  }, []);

  // Attach scroll event to window for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        hasMore &&
        !loading
      ) {
        fetchMoreTodos(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchMoreTodos, hasMore, loading]);

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
        lanes={lanes.map(lane => {
          const showLoading =
            lane.type !== 'In Progress' && loading && hasMore;
          return (
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
              loading={showLoading}
              hasMore={hasMore}
              onLoadMore={() => fetchMoreTodos(true)}
            />
          );
        })}
      />
      {/* Remove global loading indicator as well */}
    </div>
  );
};

export default App;

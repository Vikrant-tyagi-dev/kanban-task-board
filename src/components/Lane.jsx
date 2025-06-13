import React, { useState } from 'react';
import TodoCard from './TodoCard';
import styles from '../styles/Lane.module.css';

const Lane = ({ title, laneType, onDrop, onAdd, onUpdate, onDelete, todos, onDragStart }) => {
  const [isOver, setIsOver] = useState(false);
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  const filteredTodos = todos.filter(todo =>
    todo.todo.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      await onAdd({ todo: newTodo, status: laneType });
      setNewTodo('');
      setAdding(false);
    }
  };

  return (
    <div
      className={isOver ? `${styles.lane} ${styles.dragOver}` : styles.lane}
      onDragOver={e => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={e => {
        setIsOver(false);
        onDrop(e, laneType);
      }}
    >
      <h2>{title}</h2>
      <input
        className={styles.search}
        type="text"
        placeholder={`Search in ${title}`}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className={styles.scrollable}>
        {filteredTodos.map(todo => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onEdit={onUpdate}
            onDelete={onDelete}
            onDragStart={onDragStart}
          />
        ))}
        {adding ? (
          <form onSubmit={handleAdd} className={styles.addForm} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              className={styles.addInput}
              type="text"
              value={newTodo}
              autoFocus
              onChange={e => setNewTodo(e.target.value)}
              placeholder={`Add new in ${title}`}
            />
            <button type="submit" className={styles.addTaskBtn}>Add</button>
            <button type="button" className={styles.cancelTaskBtn} onClick={() => { setAdding(false); setNewTodo(''); }}>Cancel</button>
          </form>
        ) : (
          <button className={styles.addBtn} onClick={() => setAdding(true)}>＋</button>
        )}
      </div>
    </div>
  );
};

export default Lane;

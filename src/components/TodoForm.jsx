import React, { useState } from 'react';
import styles from '../styles/TodoForm.module.css';

const statusOptions = [
  'Pending',
  'In Progress',
  'Completed',
];

const TodoForm = ({ onSubmit, initialData, onCancel }) => {
  const [todo, setTodo] = useState(initialData?.todo || '');
  const [status, setStatus] = useState(initialData?.status || 'Pending');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...initialData, todo, status });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={e => setTodo(e.target.value)}
        placeholder="Todo title"
        required
      />
      <label>
        Status:
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          {statusOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>
      <div className={styles.actions}>
        <button type="submit">{initialData ? 'Update' : 'Add'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default TodoForm;

import React, { useState } from 'react';
import styles from '../styles/TodoCard.module.css';

const TodoCard = ({ todo, onEdit, onDelete, onDragStart }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.todo);
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditValue(todo.todo);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editValue.trim() && editValue !== todo.todo) {
      setLoading(true);
      await onEdit({ ...todo, todo: editValue });
      setLoading(false);
    }
    setIsEditing(false);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSubmit(e);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(todo.todo);
    }
  };

  return (
    <div
      className={styles.card}
      draggable
      onDragStart={e => onDragStart(e, todo)}
    >
      <div className={styles.content}>
        {isEditing ? (
          loading ? (
            <span className={styles.loading}>Loading...</span>
          ) : (
            <form onSubmit={handleEditSubmit} style={{ flex: 1 }}>
              <input
                className={styles.inlineInput}
                type="text"
                value={editValue}
                autoFocus
                onChange={handleEditChange}
                onBlur={handleEditSubmit}
                onKeyDown={handleEditKeyDown}
                style={{ width: '100%' }}
              />
            </form>
          )
        ) : (
          <>
            <span>{todo.todo}</span>
            <div className={styles.actions}>
              <button title="Edit" onClick={handleEditClick}>
                <span role="img" aria-label="edit">✏️</span>
              </button>
              <button title="Delete" onClick={() => onDelete(todo.id)}>
                <span role="img" aria-label="delete">🗑️</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoCard;

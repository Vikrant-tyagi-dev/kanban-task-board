import React from 'react';
import styles from '../styles/Board.module.css';

const Board = ({ lanes }) => (
  <div className={styles.board}>
    {lanes.map(lane => lane)}
  </div>
);

export default Board;

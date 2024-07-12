import React from 'react';

const TodoItem = ({ todo, onRemove, onEdit, onToggleComplete }) => {
  return (
    <li>
      <div>
        <strong>{todo.title}</strong>
        <p>{todo.description}</p>
      </div>
      <div>
        <button onClick={onToggleComplete}>{todo.completed ? '✅' : '✔️'}</button>
        <button onClick={onEdit}>✏️</button>
        <button onClick={onRemove}>🗑️</button>
      </div>
    </li>
  );
};

export default TodoItem;

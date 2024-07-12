import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addOrUpdateTodo = () => {
    let valid = true;

    if (newTitle.trim() === '') {
      setTitleError('O título da tarefa é obrigatório.');
      valid = false;
    } else {
      setTitleError('');
    }

    if (newDescription.trim() === '') {
      setDescriptionError('A descrição da tarefa é obrigatória.');
      valid = false;
    } else {
      setDescriptionError('');
    }

    if (!valid) return;

    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? { ...todo, title: newTitle, description: newDescription } : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, { title: newTitle, description: newDescription, completed: false }]);
    }

    setNewTitle('');
    setNewDescription('');
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setNewTitle(todos[index].title);
    setNewDescription(todos[index].description);
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <div className="input-group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar tarefas..."
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Título da tarefa..."
        />
        {titleError && <p className="error">{titleError}</p>}
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Descrição da tarefa..."
        />
        {descriptionError && <p className="error">{descriptionError}</p>}
        <button onClick={addOrUpdateTodo}>{editIndex !== null ? 'Atualizar' : 'Adicionar'}</button>
      </div>
      <ul>
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            onRemove={() => removeTodo(index)}
            onEdit={() => editTodo(index)}
            onToggleComplete={() => toggleComplete(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

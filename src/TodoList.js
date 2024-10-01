import React, { useReducer, useState } from 'react';
import { initialState, todoReducer } from './todoReducer'; // Import the reducer

const TodoList = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');

  const handleAddTodo = () => {
    if (newTodo && category && priority) {
      dispatch({
        type: 'ADD_TODO',
        payload: { text: newTodo, category, priority },
      });
      setNewTodo('');
      setCategory('');
      setPriority('');
    }
  };

  return (
    <div>
      <h1>Jalita's To Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter To Do"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <input
        type="text"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        placeholder="Priority"
      />
      <button onClick={handleAddTodo}>Add To Do</button>
      {state.todos.map((todo, index) => (
        <div key={index} className={`todo-item ${todo.priority}`}>
          {todo.editing ? (
            <input
              type="text"
              defaultValue={todo.text}
              onBlur={(e) => {
                dispatch({ type: 'EDIT_TODO', payload: { index, text: e.target.value } });
             
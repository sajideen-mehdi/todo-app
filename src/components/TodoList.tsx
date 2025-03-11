import React, { useState } from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
    setEditingId(null);
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <TodoForm onSubmit={addTodo} />
      <div className="todos">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            isEditing={editingId === todo.id}
            setEditingId={setEditingId}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList; 
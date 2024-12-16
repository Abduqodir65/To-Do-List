// App.jsx
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch {
      console.error("Local storagedan ma'lumot olishda xatolik!");
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error("Local storage yozishda xatolik:", error);
    }
  }, [todos]);

  const addTodo = (newTodo) => {
    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      isEditing: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodoItem]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const toggleEditMode = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText flex flex-col items-center justify-center p-4"
    >
      <ThemeToggle />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl shadow-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Mening Vazifalarim</h1>
        <TodoInput onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
          onToggleEditMode={toggleEditMode}
        />
        <ToastContainer position="top-right" autoClose={3000} />
      </motion.div>
    </motion.div>
  );
}

export default App;

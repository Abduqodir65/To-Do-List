import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";

function TodoList({
    todos,
    onDeleteTodo,
    onEditTodo,
    onToggleEditMode
}) {
    return (
        <div className="w-full max-w-md space-y-3">
            {todos.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-gray-500 italic"
                >
                    Hech qanday vazifa yo'q
                </motion.div>
            ) : (
                <AnimatePresence>
                    {todos.map((todo) => (
                        <motion.div
                            key={todo.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                                duration: 0.3,
                                type: "tween"
                            }}
                        >
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onDeleteTodo={onDeleteTodo}
                                onEditTodo={onEditTodo}
                                onToggleEditMode={onToggleEditMode} 
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </div>
    );
}

export default TodoList;
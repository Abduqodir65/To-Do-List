import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Edit, CheckCircle2, XCircle } from "lucide-react";

function TodoItem({ todo, onDeleteTodo, onEditTodo, onToggleEditMode }) {
    const [editValue, setEditValue] = useState(todo.text);
    const inputRef = useRef(null);

    // Edit rejimida inputga avtomatik fokus
    useEffect(() => {
        if (todo.isEditing) {
            inputRef.current?.focus();
        }
    }, [todo.isEditing]);

    const handleSave = () => {
        if (editValue.trim() !== "") {
            onEditTodo(todo.id, editValue);
            onToggleEditMode(todo.id);
        }
    };

    // Klaviatura bilan navigationni ta'minlash
    const handleKeyDown = (e) => {
        if (todo.isEditing) {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') onToggleEditMode(todo.id);
        }
    };

    if (todo.isEditing) {
        return (
            <motion.li
                initial={{ scale: 0.95, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white shadow-md p-4 rounded-md flex items-center border-l-4 border-yellow-500"
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow px-2 py-1 border rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    aria-label="Vazifani tahrirlash"
                />
                <div className="flex items-center space-x-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSave}
                        className="text-green-500 hover:text-green-700"
                        aria-label="Saqlash"
                    >
                        <CheckCircle2 />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onToggleEditMode(todo.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Bekor qilish"
                    >
                        <XCircle />
                    </motion.button>
                </div>
            </motion.li>
        );
    }

    return (
        <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white shadow-md p-4 rounded-md flex justify-between items-center border-l-4 border-blue-500 hover:shadow-lg transition-all"
        >
            <span className="text-gray-700 flex-grow">{todo.text}</span>
            <div className="flex items-center space-x-2">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onToggleEditMode(todo.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    aria-label="Tahrirlash"
                >
                    <Edit size={20} />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDeleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="O'chirish"
                >
                    <Trash2 />
                </motion.button>
            </div>
        </motion.li>
    );
}

export default TodoItem;
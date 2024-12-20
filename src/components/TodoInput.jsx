import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

function TodoInput({ onAddTodo }) {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleAdd = () => {
        if (inputValue.trim() !== "") {
            onAddTodo(inputValue);
            setInputValue("");
            toast.success("Vazifa muvaffaqiyatli qo'shildi!");
            inputRef.current?.focus();
        } else {
            toast.error("Iltimos, vazifa matnini kiriting!");
        }
    };

    // Klaviatura bilan navigationni ta'minlash
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleAdd();
        if (e.key === 'Escape') setInputValue('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mb-6 flex items-center"
        >
            <input
                ref={inputRef}
                type="text"
                placeholder="Yangi vazifa kiriting"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="px-4 py-3 w-full rounded-l-md shadow-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Yangi vazifa kiriting"
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-r-md shadow-lg hover:opacity-90 transition-all flex items-center"
                aria-label="Vazifa qo'shish"
            >
                <PlusCircle className="mr-2" /> Qo'shish
            </motion.button>
        </motion.div>
    );
}

export default TodoInput;
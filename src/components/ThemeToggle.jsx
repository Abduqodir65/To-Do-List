// components/ThemeToggle.jsx
import { useState, useEffect } from 'react';

function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        // Avvalgi tanlovni localStorage'dan o'qiymiz
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark((prev) => !prev);

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded shadow-lg"
        >
            {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
    );
}

export default ThemeToggle;

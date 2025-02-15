import { useState, useEffect } from 'react';

/**
 * Custom hook for managing local storage in React with TypeScript.
 * @param key - The key to store the value under in local storage.
 * @param initialValue - The initial value to use if no value is found in local storage.
 * @returns A tuple containing the stored value and a function to update it.
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn('Error reading localStorage key', key, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.warn('Error setting localStorage key', key, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
};

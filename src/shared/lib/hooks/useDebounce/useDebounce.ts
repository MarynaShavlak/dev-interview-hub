import { MutableRefObject, useCallback, useRef } from 'react';

/**
 * Custom hook to debounce a callback function.
 * @param {Function} callback  - The function to be executed after the debounce delay.
 * @param {number} delay - The delay duration in milliseconds before invoking the callback.
 *
 *
 * @returns {Function} A debounced version of the callback function. This function
 * should be called in place of the original callback. It will only execute the callback
 * after the specified delay has passed since the last call.
 */

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
    const timer = useRef() as MutableRefObject<any>;

    return useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );
}

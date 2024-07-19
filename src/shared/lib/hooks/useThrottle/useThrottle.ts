import { useCallback, useRef } from 'react';

/**
 * Custom hook to throttle a callback function.
 * @param {Function} callback - The function to be throttled.
 * @param {number} delay - The delay (in milliseconds) between allowed calls to the callback.
 *
 * @returns {Function} A throttled version of the callback function. This function
 * should be called in place of the original callback.
 */

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
    const throttleRef = useRef(false);
    return useCallback(
        (...args: any[]) => {
            if (!throttleRef.current) {
                callback(...args);
                throttleRef.current = true;
                setTimeout(() => {
                    throttleRef.current = false;
                }, delay);
            }
        },
        [callback, delay],
    );
}

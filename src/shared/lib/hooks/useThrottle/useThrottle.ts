import { useCallback, useRef } from 'react';

/**
 * Custom hook to throttle a callback function.
 * @param callback - The function to be throttled.
 * @param delay - The delay (in milliseconds) between allowed calls to the callback.
 * @returns A throttled version of the callback function.
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

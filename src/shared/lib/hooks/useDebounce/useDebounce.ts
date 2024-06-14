import { MutableRefObject, useCallback, useRef } from 'react';
/**
 * Хук, який дозволяє відміняти попередній виклик функції, поки не сплине затримка (delay)
 * @param callback
 * @param delay - затримка в мс
 */

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
    const timer = useRef() as MutableRefObject<any>;

    return useCallback((...args: any[]) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
}

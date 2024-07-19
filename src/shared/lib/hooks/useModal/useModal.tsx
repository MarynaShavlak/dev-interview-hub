import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

/**
 * Custom hook for managing modal state, animations, and event listeners.
 * @param {number} animationDelay - The duration (in milliseconds) of the closing animation.
 * @param {boolean} isOpen -  Boolean indicating whether the modal is currently open.
 * @param {() => void} onClose - Optional callback function to be invoked when the modal is closed.
 *
 * @returns {{
 *    isClosing: boolean;
 *    isMounted: boolean;
 *    close: () => void;
 *  }} An object with the following properties:
 *  *  - `isClosing`: Boolean indicating if the modal is in the process of closing.
 *  *  - `isMounted`: Boolean indicating if the modal is currently mounted.
 *  *  - `close`: Function to trigger the modal closing sequence.
 */

interface UseModalProps {
    animationDelay: number;
    onClose?: () => void;
    isOpen?: boolean;
}

export function useModal({ animationDelay, isOpen, onClose }: UseModalProps) {
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef() as MutableRefObject<
        ReturnType<typeof setTimeout>
    >;

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close();
            }
        },
        [close],
    );

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return {
        isClosing,
        isMounted,
        close,
    };
}

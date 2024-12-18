import { useCallback, useState } from 'react';

// export const useToggleVisibility = () => {
//     const [isVisible, setIsVisible] = useState<boolean>(false);
//
//     const toggleVisibility = useCallback(() => {
//         setIsVisible((prev) => !prev);
//     }, []);
//
//     return { isVisible, toggleVisibility };
// };

export const useToggleVisibility = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [clickCount, setClickCount] = useState<number>(0);

    const toggleVisibility = useCallback(() => {
        setIsVisible((prev) => !prev);
        setClickCount(0); // Reset click count when toggleVisibility is used
    }, []);

    const showElement = useCallback(() => {
        setClickCount((prevCount) => {
            const newCount = prevCount + 1;

            if (newCount === 1) {
                setIsVisible(true); // Show the element on the first click
            }

            return newCount;
        });
    }, []);

    return { isVisible, toggleVisibility, showElement };
};

import { useState, useCallback } from 'react';

export const useToggleVisibility = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = useCallback(() => {
        setIsVisible((prev) => !prev);
    }, []);

    return { isVisible, toggleVisibility };
};

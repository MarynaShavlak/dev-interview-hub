import { useState, useCallback } from 'react';

export const useToggleForm = (isOpen: boolean = true) => {
    const [isLoginFormOpen, setIsLoginFormOpen] = useState<boolean>(isOpen);

    const toggleForm = useCallback(() => {
        setIsLoginFormOpen((prevState) => !prevState);
    }, []);

    return { isLoginFormOpen, toggleForm };
};

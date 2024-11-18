import { useState, useCallback } from 'react';

export const useToggleForm = () => {
    const [isLoginFormOpen, setIsLoginFormOpen] = useState<boolean>(true);

    const toggleForm = useCallback(() => {
        setIsLoginFormOpen((prevState) => !prevState);
    }, []);

    return { isLoginFormOpen, toggleForm };
};

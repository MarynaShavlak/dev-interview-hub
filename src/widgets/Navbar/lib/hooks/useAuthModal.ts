import { useCallback, useState } from 'react';

export const useAuthModal = () => {
    const [isAuthModal, setIsAuthModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    return {
        isAuthModal,
        onShowModal,
        onCloseModal,
    };
};

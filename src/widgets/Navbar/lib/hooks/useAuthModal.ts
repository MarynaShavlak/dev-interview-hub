import { useCallback, useState } from 'react';

/**
 * Custom hook for managing the state of an authentication modal.
 *
 * @returns {{
 *    isAuthModal: boolean;
 *    onShowModal: () => void;
 *    onCloseModal: () => void;
 *  }} An object with the following properties:
 *  * `isAuthModal`: Boolean indicating whether the authentication modal is currently visible.
 *  * `onShowModal`: Function to display the authentication modal by setting `isAuthModal` to `true`.
 *  * `onCloseModal`: Function to hide the authentication modal by setting `isAuthModal` to `false`.
 *
 */

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

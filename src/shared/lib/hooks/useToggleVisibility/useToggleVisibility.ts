// import { useCallback, useState } from 'react';
//
// // export const useToggleVisibility = () => {
// //     const [isVisible, setIsVisible] = useState<boolean>(false);
// //
// //     const toggleVisibility = useCallback(() => {
// //         setIsVisible((prev) => !prev);
// //     }, []);
// //
// //     return { isVisible, toggleVisibility };
// // };
//
// export const useToggleVisibility = (isVisibleEl = false) => {
//     const [isVisible, setIsVisible] = useState<boolean>(isVisibleEl);
//     const [clickCount, setClickCount] = useState<number>(0);
//
//     const toggleVisibility = useCallback(() => {
//         setIsVisible((prev) => !prev);
//         setClickCount(0); // Reset click count when toggleVisibility is used
//     }, []);
//
//     const show = useCallback(() => {
//         setClickCount((prevCount) => {
//             const newCount = prevCount + 1;
//
//             if (newCount === 1) {
//                 setIsVisible(true); // Show the element on the first click
//             }
//
//             return newCount;
//         });
//     }, []);
//     const hide = useCallback(() => {
//         setIsVisible(false);
//         setClickCount(0);
//     }, []);
//
//     return { isVisible, toggleVisibility, show, hide };
// };

import { useState, useCallback } from 'react';

export interface UseToggleVisibilityReturnType {
    isVisible: boolean;
    toggleVisibility: () => void;
    show: () => void;
    hide: () => void;
}

export const useToggleVisibility = (
    isVisibleEl = false,
): UseToggleVisibilityReturnType => {
    const [isVisible, setIsVisible] = useState<boolean>(isVisibleEl);

    const toggleVisibility = useCallback(() => {
        setIsVisible((prev) => !prev);
    }, []);

    const show = useCallback(() => {
        setIsVisible(true);
    }, []);

    const hide = useCallback(() => {
        setIsVisible(false);
    }, []);

    return { isVisible, toggleVisibility, show, hide };
};

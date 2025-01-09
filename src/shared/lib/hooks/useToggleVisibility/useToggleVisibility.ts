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
//     const showElement = useCallback(() => {
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
//     const hideElement = useCallback(() => {
//         setIsVisible(false);
//         setClickCount(0);
//     }, []);
//
//     return { isVisible, toggleVisibility, showElement, hideElement };
// };

import { useState, useCallback } from 'react';

export const useToggleVisibility = (isVisibleEl = false) => {
    const [isVisible, setIsVisible] = useState<boolean>(isVisibleEl);

    const toggleVisibility = useCallback(() => {
        setIsVisible((prev) => !prev);
    }, []);

    const showElement = useCallback(() => {
        setIsVisible(true);
    }, []);

    const hideElement = useCallback(() => {
        setIsVisible(false);
    }, []);

    return { isVisible, toggleVisibility, showElement, hideElement };
};

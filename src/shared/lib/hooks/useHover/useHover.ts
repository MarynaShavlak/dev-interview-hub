import { useCallback, useMemo, useState } from 'react';

/**
 * Custom hook for managing and tracking hover state of an element.
 * @returns {{
 *    isHover: boolean;
 *    bind: UseHoverBind;
 *  }} An object with the following properties:
 *  * `isHover`: Boolean indicating whether the element is currently being hovered over.
 *  * `bind`: An object containing `onMouseEnter` and `onMouseLeave` event handlers. These handlers should be attached to the element you want to track hover state for.
 */

interface UseHoverBind {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

type UseHoverResult = [boolean, UseHoverBind];

export const useHover = (): UseHoverResult => {
    const [isHover, setIsHover] = useState(false);

    const onMouseEnter = useCallback(() => {
        setIsHover(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setIsHover(false);
    }, []);

    return useMemo(
        () => [
            isHover,
            {
                onMouseEnter,
                onMouseLeave,
            },
        ],
        [isHover, onMouseEnter, onMouseLeave],
    );
};

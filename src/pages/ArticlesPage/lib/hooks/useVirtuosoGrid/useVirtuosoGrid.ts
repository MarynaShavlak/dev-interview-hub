import { useEffect, useRef } from 'react';
import { VirtuosoGridHandle } from 'react-virtuoso';

/**
 * Custom hook for managing scroll position in a Virtuoso grid component based on a given article index.
 *
 * This hook provides a reference to the Virtuoso grid handle and ensures that the grid smoothly scrolls to a specified index when it changes. It is particularly useful for synchronizing the scroll position of a grid with dynamic content or user interactions.
 *
 * @param {number} scrollStopArticleIndex - The index of the article to which the grid should scroll.
 *
 * @returns {React.RefObject<VirtuosoGridHandle>} A reference to the Virtuoso grid handle that allows interaction with the grid component.
 *
 * The hook uses the `useEffect` hook to trigger a smooth scroll to the specified index when `scrollStopArticleIndex` changes. It utilizes `setTimeout` to ensure the grid is fully rendered before performing the scroll action.
 *
 */

export const useVirtuosoGrid = (scrollStopArticleIndex: number) => {
    const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (virtuosoGridRef.current) {
                virtuosoGridRef.current.scrollToIndex({
                    index: scrollStopArticleIndex,
                    align: 'start',
                    behavior: 'smooth',
                });
            }
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [scrollStopArticleIndex]);

    return virtuosoGridRef;
};

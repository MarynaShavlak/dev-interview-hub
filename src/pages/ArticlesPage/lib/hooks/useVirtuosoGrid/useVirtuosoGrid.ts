import { useEffect, useRef } from 'react';
import { VirtuosoGridHandle } from 'react-virtuoso';

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
            } else {
                console.warn(
                    'VirtuosoGridHandle ref is not available. Ensure the VirtuosoGrid component is mounted before attempting to scroll.',
                );
            }
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [scrollStopArticleIndex]);

    return virtuosoGridRef;
};

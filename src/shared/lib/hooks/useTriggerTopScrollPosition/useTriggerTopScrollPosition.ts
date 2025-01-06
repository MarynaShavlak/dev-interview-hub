import { RefObject, useEffect, useState } from 'react';

export const useTriggerTopScrollPosition = (
    triggerRef: RefObject<HTMLDivElement>,
    offset = 0,
): number => {
    const [topPosition, setTopPosition] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            if (triggerRef.current) {
                const rect = triggerRef.current.getBoundingClientRect();
                setTopPosition(rect.top - offset);
            }
        };

        // Attach scroll event listener
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial position calculation

        // Cleanup on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [triggerRef, offset]);

    return topPosition;
};

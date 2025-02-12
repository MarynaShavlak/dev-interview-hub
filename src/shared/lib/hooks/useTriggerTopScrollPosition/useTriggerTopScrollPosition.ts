import { RefObject, useEffect, useState } from 'react';

export const useTriggerTopScrollPosition = (
    triggerRef: RefObject<HTMLDivElement>,
    scrollElement?: RefObject<HTMLElement> | null,
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
        const target = scrollElement?.current ?? window;

        target.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => target.removeEventListener('scroll', handleScroll);
    }, [triggerRef, offset, scrollElement]);

    return topPosition;
};

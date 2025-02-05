import { useEffect, useState } from 'react';
import { calculateAvailableFlexColumnWidth } from '../../utilities/calculateAvailableTitleWidth/calculateAvailableFlexColumnWidth';

export const useFlexColumnWidth = (
    widthParams: Record<string, number>,
    minColumnWidth: number,
): number => {
    const [flexColumnWidth, setFlexColumnWidth] = useState(230);

    useEffect(() => {
        const calculateColumnWidth = () => {
            const newColumnWidth = calculateAvailableFlexColumnWidth(
                widthParams,
                minColumnWidth,
            );
            setFlexColumnWidth(newColumnWidth);
        };

        const resizeObserver = new ResizeObserver(calculateColumnWidth);
        const sidebar = document.querySelector('[data-testid="sidebar"]');

        if (sidebar) {
            resizeObserver.observe(sidebar);
            calculateColumnWidth();
        }

        return () => resizeObserver.disconnect();
    }, [minColumnWidth, widthParams]);

    return flexColumnWidth;
};

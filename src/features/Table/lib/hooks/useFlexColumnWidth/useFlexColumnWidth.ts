import { useEffect, useState } from 'react';
import { calculateAvailableFlexColumnWidth } from '../../utilities/calculateAvailableTitleWidth/calculateAvailableFlexColumnWidth';
import { getSidebarElement } from '@/shared/lib/getDOMElements/getSidebarElement';

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
        const sidebar = getSidebarElement();

        if (sidebar) {
            resizeObserver.observe(sidebar);
            calculateColumnWidth();
        }

        window.addEventListener('resize', calculateColumnWidth);
        calculateColumnWidth();

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', calculateColumnWidth);
        };
    }, [minColumnWidth, widthParams]);

    return flexColumnWidth;
};

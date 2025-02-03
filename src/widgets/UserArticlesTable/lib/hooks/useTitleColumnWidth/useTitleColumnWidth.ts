import { useEffect, useState } from 'react';
import { calculateAvailableTitleWidth } from '../../utilities/calculateAvailableTitleWidth/calculateWidth';

export const useTitleColumnWidth = (): number => {
    const [titleColumnWidth, setTitleColumnWidth] = useState(230);

    useEffect(() => {
        const calculateTitleWidth = () => {
            const sidebar = document.querySelector(
                '[data-testid="sidebar-wrap"]',
            );
            if (!sidebar) return;

            const sidebarRect = sidebar.getBoundingClientRect();
            const newTitleWidth = calculateAvailableTitleWidth(
                sidebarRect.width,
            );
            setTitleColumnWidth(newTitleWidth);
        };

        const resizeObserver = new ResizeObserver(calculateTitleWidth);
        const sidebar = document.querySelector('[data-testid="sidebar"]');

        if (sidebar) {
            resizeObserver.observe(sidebar);
            calculateTitleWidth();
        }

        return () => resizeObserver.disconnect();
    }, []);

    return titleColumnWidth;
};

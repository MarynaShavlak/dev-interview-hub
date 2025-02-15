import { useCallback, useEffect, useState } from 'react';
import { toggleFeatures } from '../../features';

export const SIDEBAR_COLLAPSED_WIDTH = 115;
export const useSidebarCollapseState = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const checkSidebarWidth = useCallback((width: number) => {
        setIsCollapsed(width <= SIDEBAR_COLLAPSED_WIDTH);
    }, []);

    useEffect(() => {
        const sidebar = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => document.querySelector('[data-testid="sidebar-wrap"]'),
            off: () => document.querySelector('[data-testid="sidebar"]'),
        });

        if (!sidebar) {
            return undefined;
        }

        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) =>
                checkSidebarWidth(entry.contentRect.width),
            );
        });

        resizeObserver.observe(sidebar);
        return () => resizeObserver.disconnect();
    }, [checkSidebarWidth]);

    return isCollapsed;
};

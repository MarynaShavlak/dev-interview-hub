import { useCallback, useEffect, useState } from 'react';

export const SIDEBAR_COLLAPSED_WIDTH = 115;
export const useSidebarCollapseState = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const checkSidebarWidth = useCallback((width: number) => {
        setIsCollapsed(width <= SIDEBAR_COLLAPSED_WIDTH);
    }, []);

    useEffect(() => {
        const sidebar = document.querySelector('[data-testid="sidebar-wrap"]');
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

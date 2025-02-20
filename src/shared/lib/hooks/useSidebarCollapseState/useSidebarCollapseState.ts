import { useCallback, useEffect, useState } from 'react';
import { getSidebarElement } from '../../getDOMElements/getSidebarElement';

export const SIDEBAR_COLLAPSED_WIDTH = 115;
export const useSidebarCollapseState = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const checkSidebarWidth = useCallback((width: number) => {
        setIsCollapsed(width <= SIDEBAR_COLLAPSED_WIDTH);
    }, []);

    useEffect(() => {
        const sidebar = getSidebarElement();

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

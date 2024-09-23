import { useState, useCallback } from 'react';

/**
 * Custom hook for managing the collapsed state of a sidebar.
 * @param {boolean} [initialState=false] - Optional initial state indicating whether the sidebar is collapsed on initial render.
 *
 * @returns {{
 *    collapsed: boolean;
 *    toggleCollapse: () => void;
 *  }} An object with the following properties:
 *  *  - `collapsed`: Boolean indicating if the sidebar is currently collapsed.
 *  *  - `toggleCollapse`: Function to toggle the sidebar’s collapsed state between expanded and collapsed.
 */

export const useSidebarCollapse = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = useCallback(() => {
        setCollapsed((prev) => !prev);
    }, []);

    return {
        collapsed,
        toggleCollapse,
    };
};

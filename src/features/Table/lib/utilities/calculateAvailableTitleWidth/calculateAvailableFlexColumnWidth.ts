import { calculateTotalFixedColumnsWidth } from '../calculateTotalFixedColumnsWidth/calculateTotalFixedColumnsWidth';
import { TABLE_BORDER_WIDTH } from '../../../model/consts/tableConsts';

export const calculateAvailableFlexColumnWidth = (
    widthParams: Record<string, number>,
    minColumnWidth: number,
): number => {
    const toolbar = document.querySelector('[data-testid="toolbar"]');
    const sidebar = document.querySelector('[data-testid="sidebar-wrap"]');
    const toolbarWidth = toolbar?.getBoundingClientRect().width ?? 0; // Ensures `0` is used when `toolbar` is `null`
    const sidebarWidth = sidebar?.getBoundingClientRect().width ?? 0;
    const availableWidth =
        window.innerWidth -
        sidebarWidth -
        calculateTotalFixedColumnsWidth(widthParams) -
        toolbarWidth -
        TABLE_BORDER_WIDTH;

    return Math.max(availableWidth, minColumnWidth);
};

import { calculateTotalFixedColumnsWidth } from '../calculateTotalFixedColumnsWidth/calculateTotalFixedColumnsWidth';
import {
    PAGE_PADDINGS_WIDTH,
    TABLE_BORDER_WIDTH,
} from '../../../model/consts/tableConsts';
import { getSidebarElement } from '@/shared/lib/getDOMElements/getSidebarElement';
import { getToolbarElement } from '@/shared/lib/getDOMElements/getToolbarElement';

/**
 * Calculates the available width for flexible columns in the table layout.
 *
 * @param columnWidths - Object containing widths of fixed columns.
 * @param minColumnWidth - Minimum allowed width for flexible columns.
 * @returns Computed available width for flexible columns.
 */

export const calculateAvailableFlexColumnWidth = (
    columnWidths: Record<string, number>,
    minColumnWidth: number,
): number => {
    const toolbar = getToolbarElement();
    const sidebar = getSidebarElement();

    const toolbarWidth = toolbar?.getBoundingClientRect().width ?? 0;
    const sidebarWidth = sidebar?.getBoundingClientRect().width ?? 0;
    const fixedColumnsWidth = calculateTotalFixedColumnsWidth(columnWidths);
    const nonAdjustableWidth =
        sidebarWidth + toolbarWidth + TABLE_BORDER_WIDTH + PAGE_PADDINGS_WIDTH;

    const availableWidth =
        window.innerWidth - fixedColumnsWidth - nonAdjustableWidth;

    return Math.max(
        Math.min(availableWidth, 1200 - fixedColumnsWidth),
        minColumnWidth,
    );
};

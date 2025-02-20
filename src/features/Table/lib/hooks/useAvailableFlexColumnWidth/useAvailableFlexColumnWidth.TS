import { useCallback, useEffect, useState } from 'react';
import { getToolbarElement } from '@/shared/lib/getDOMElements/getToolbarElement';
import { getSidebarElement } from '@/shared/lib/getDOMElements/getSidebarElement';
import { calculateTotalFixedColumnsWidth } from '../../utilities/calculateTotalFixedColumnsWidth/calculateTotalFixedColumnsWidth';
import {
    MAX_TABLE_WIDTH,
    PAGE_PADDINGS_WIDTH,
    TABLE_BORDER_WIDTH,
} from '../../../model/consts/tableConsts';

/**
 * Custom hook to calculate the available width for flexible columns dynamically.
 *
 * @param columnWidths - Object containing widths of fixed columns.
 * @param minColumnWidth - Minimum allowed width for flexible columns.
 * @returns The available flexible column width.
 */
export const useAvailableFlexColumnWidth = (
    columnWidths: Record<string, number>,
    minColumnWidth: number,
): number => {
    const [availableWidth, setAvailableWidth] = useState<number>(0);

    const calculateWidth = useCallback(() => {
        const toolbar = getToolbarElement();
        const sidebar = getSidebarElement();

        const toolbarWidth = toolbar?.getBoundingClientRect().width ?? 0;
        const sidebarWidth = sidebar?.getBoundingClientRect().width ?? 0;
        const fixedColumnsWidth = calculateTotalFixedColumnsWidth(columnWidths);

        const nonAdjustableWidth =
            sidebarWidth +
            toolbarWidth +
            TABLE_BORDER_WIDTH +
            PAGE_PADDINGS_WIDTH;
        const newAvailableWidth =
            window.innerWidth - fixedColumnsWidth - nonAdjustableWidth;

        setAvailableWidth(
            Math.max(
                Math.min(
                    newAvailableWidth,
                    MAX_TABLE_WIDTH - fixedColumnsWidth,
                ),
                minColumnWidth,
            ),
        );
    }, [columnWidths, minColumnWidth]);

    useEffect(() => {
        calculateWidth(); // Initial calculation

        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    }, [calculateWidth]);

    return availableWidth;
};

import { calculateTotalFixedColumnsWidth } from '../calculateTotalFixedColumnsWidth/calculateTotalFixedColumnsWidth';
import {
    PAGE_PADDINGS_WIDTH,
    TABLE_BORDER_WIDTH,
} from '../../../model/consts/tableConsts';
import { toggleFeatures } from '@/shared/lib/features';

export const calculateAvailableFlexColumnWidth = (
    widthParams: Record<string, number>,
    minColumnWidth: number,
): number => {
    let availableWidth = 0;
    const toolbar = document.querySelector('[data-testid="toolbar"]');

    const sidebar = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => document.querySelector('[data-testid="sidebar-wrap"]'),
        off: () => document.querySelector('[data-testid="sidebar"]'),
    });

    const toolbarWidth = toolbar?.getBoundingClientRect().width ?? 0;

    const sidebarWidth = sidebar?.getBoundingClientRect().width ?? 0;

    const fixedColumnsWidthSum = calculateTotalFixedColumnsWidth(widthParams);

    const stableWidthValue =
        sidebarWidth + toolbarWidth + TABLE_BORDER_WIDTH + PAGE_PADDINGS_WIDTH;

    availableWidth =
        window.innerWidth - fixedColumnsWidthSum - stableWidthValue;

    const sum = availableWidth + fixedColumnsWidthSum;

    if (sum > 1200) {
        availableWidth = 1200 - fixedColumnsWidthSum;
    }

    return Math.max(availableWidth, minColumnWidth);
};

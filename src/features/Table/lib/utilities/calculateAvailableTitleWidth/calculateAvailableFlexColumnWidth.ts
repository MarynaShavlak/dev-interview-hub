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
    const toolbar = document.querySelector('[data-testid="toolbar"]');

    const sidebar = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => document.querySelector('[data-testid="sidebar-wrap"]'),
        off: () => document.querySelector('[data-testid="sidebar"]'),
    });

    const toolbarWidth = toolbar?.getBoundingClientRect().width ?? 0;

    const sidebarWidth = sidebar?.getBoundingClientRect().width ?? 0;

    const availableWidth =
        window.innerWidth -
        sidebarWidth -
        calculateTotalFixedColumnsWidth(widthParams) -
        toolbarWidth -
        TABLE_BORDER_WIDTH -
        PAGE_PADDINGS_WIDTH;

    return Math.max(availableWidth, minColumnWidth);
};

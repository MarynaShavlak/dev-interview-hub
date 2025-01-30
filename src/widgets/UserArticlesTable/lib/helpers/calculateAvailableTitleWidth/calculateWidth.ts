import {
    FIXED_COLUMNS_WIDTH,
    MINIMUM_TITLE_WIDTH,
    PADDING_RIGHT,
} from '../../../model/consts/fixedColumnsWidth';

export const calculateTotalFixedColumnsWidth = () =>
    Object.values(FIXED_COLUMNS_WIDTH).reduce((sum, width) => sum + width, 0);

export const calculateAvailableTitleWidth = (sidebarWidth: number): number => {
    const availableWidth =
        window.innerWidth -
        sidebarWidth -
        calculateTotalFixedColumnsWidth() -
        PADDING_RIGHT -
        2;

    return Math.max(availableWidth, MINIMUM_TITLE_WIDTH);
};

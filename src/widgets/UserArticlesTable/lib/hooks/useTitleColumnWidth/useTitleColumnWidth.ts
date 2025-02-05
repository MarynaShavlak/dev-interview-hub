import { useEffect, useState } from 'react';

import {
    FIXED_COLUMNS_WIDTH,
    MINIMUM_TITLE_WIDTH,
} from '../../../model/consts/fixedColumnsWidth';
import { calculateAvailableFlexColumnWidth } from '@/features/Table';

export const useTitleColumnWidth = (): number => {
    const [titleColumnWidth, setTitleColumnWidth] = useState(230);

    useEffect(() => {
        const calculateTitleWidth = () => {
            const newTitleWidth = calculateAvailableFlexColumnWidth(
                FIXED_COLUMNS_WIDTH,
                MINIMUM_TITLE_WIDTH,
            );
            setTitleColumnWidth(newTitleWidth);
        };

        const resizeObserver = new ResizeObserver(calculateTitleWidth);
        const sidebar = document.querySelector('[data-testid="sidebar"]');

        if (sidebar) {
            resizeObserver.observe(sidebar);
            calculateTitleWidth();
        }

        return () => resizeObserver.disconnect();
    }, []);

    return titleColumnWidth;
};

import { toggleFeatures } from '@/shared/lib/features';

export const TABLE_BORDER_WIDTH = 4;

export const PAGE_PADDINGS_WIDTH = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => 0,
    off: () => 60,
});

export const MAX_TABLE_WIDTH = 1200;

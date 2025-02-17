import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/wide-list.svg';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import SequenceIcon from '@/shared/assets/icons/list-ordered.svg';

import { toggleFeatures } from '@/shared/lib/features';

/**
 * This module defines view configurations for articles and uses feature toggling to select appropriate icons
 * based on the `isAppRedesigned` feature flag.
 */

const gridType = {
    view: ArticleView.GRID,
    icon: toggleFeatures({
        name: 'isAppRedesigned',
        on: () => TiledIcon,
        off: () => TiledIconDeprecated,
    }),
};

export const deprecatedViewTypes = [
    gridType,
    {
        view: ArticleView.LIST,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
];

export const redesignedViewTypes = [
    {
        view: ArticleView.SEQUENCE,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => SequenceIcon,
            off: () => SequenceIcon,
        }),
    },
    gridType,
];

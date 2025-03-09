import { ArticleView } from '@/entities/Article';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import SequenceIcon from '@/shared/assets/icons/list-ordered.svg';

import { toggleFeatures } from '@/shared/lib/features';

export const getRedesignedViewTypes = () => [
    {
        view: ArticleView.SEQUENCE,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => SequenceIcon,
            off: () => SequenceIcon,
        }),
    },
    {
        view: ArticleView.GRID,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TiledIcon,
            off: () => TiledIconDeprecated,
        }),
    },
];

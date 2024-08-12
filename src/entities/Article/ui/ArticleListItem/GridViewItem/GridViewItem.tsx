import { HTMLAttributeAnchorTarget, memo } from 'react';
import { RedesignedGridViewItem } from './RedesignedGridViewItem/RedesignedGridViewItem';
import { Article } from '../../../model/types/article';
import { DeprecatedGridViewItem } from './DeprecatedGridViewItem/DeprecatedGridViewItem';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export interface GridViewItemProps {
    className?: string;
    article: Article;
    target?: HTMLAttributeAnchorTarget;
    index: number;
}

export const GridViewItem = memo((props: GridViewItemProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedGridViewItem {...props} />}
            off={<DeprecatedGridViewItem {...props} />}
        />
    );
});

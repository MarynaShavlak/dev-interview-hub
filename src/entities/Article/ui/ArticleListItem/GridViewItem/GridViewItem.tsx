import { HTMLAttributeAnchorTarget, memo } from 'react';
import { RedesignedGridViewItem } from './RedesignedGridViewItem/RedesignedGridViewItem';
import { Article } from '../../../model/types/article';
import { DeprecatedGridViewItem } from './DeprecatedGridViewItem/DeprecatedGridViewItem';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export interface GridViewItemProps {
    className?: string;
    article: Article;
    target?: HTMLAttributeAnchorTarget;
}

export const GridViewItem = memo((props: GridViewItemProps) => {
    const { className, article, target } = props;

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <RedesignedGridViewItem
                    className={className}
                    article={article}
                    target={target}
                />
            }
            off={
                <DeprecatedGridViewItem
                    className={className}
                    article={article}
                    target={target}
                />
            }
        />
    );
});

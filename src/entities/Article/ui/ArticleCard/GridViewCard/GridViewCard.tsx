import { HTMLAttributeAnchorTarget, memo } from 'react';
import { RedesignedGridViewCard } from './RedesignedGridViewCard/RedesignedGridViewCard';
import { Article } from '../../../model/types/article';
import { DeprecatedGridViewCard } from './DeprecatedGridViewCard/DeprecatedGridViewCard';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export interface GridViewCardProps {
    className?: string;
    article: Article;
    target?: HTMLAttributeAnchorTarget;
    index: number;
}

export const GridViewCard = memo((props: GridViewCardProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedGridViewCard {...props} />}
            off={<DeprecatedGridViewCard {...props} />}
        />
    );
});

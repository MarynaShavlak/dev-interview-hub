import { memo } from 'react';
import { RedesignedListViewCard } from './RedesignedListViewCard/RedesignedListViewCard';
import { DeprecatedListViewCard } from './DeprecatedListViewCard/DeprecatedListViewCard';
import { Article } from '../../../model/types/article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export interface ListViewCardProps {
    className?: string;
    article: Article;
    index: number;
}

export const ListViewCard = memo((props: ListViewCardProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedListViewCard {...props} />}
            off={<DeprecatedListViewCard {...props} />}
        />
    );
});

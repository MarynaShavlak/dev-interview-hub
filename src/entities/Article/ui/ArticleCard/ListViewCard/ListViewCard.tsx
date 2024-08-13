import { memo } from 'react';
import { RedesignedListViewCard } from './RedesignedListViewCard/RedesignedListViewCard';
import { DeprecatedListViewCard } from './DeprecatedListViewCard/DeprecatedListViewCard';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { BaseCardProps } from '../ArticleCard';

export const ListViewCard = memo((props: BaseCardProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedListViewCard {...props} />}
            off={<DeprecatedListViewCard {...props} />}
        />
    );
});

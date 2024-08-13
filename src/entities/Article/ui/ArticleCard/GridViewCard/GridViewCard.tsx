import { memo } from 'react';
import { RedesignedGridViewCard } from './RedesignedGridViewCard/RedesignedGridViewCard';
import { DeprecatedGridViewCard } from './DeprecatedGridViewCard/DeprecatedGridViewCard';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { BaseCardProps } from '../ArticleCard';

export const GridViewCard = memo((props: BaseCardProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedGridViewCard {...props} />}
            off={<DeprecatedGridViewCard {...props} />}
        />
    );
});

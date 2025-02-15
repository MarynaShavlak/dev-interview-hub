import { memo } from 'react';
import { GridViewCardRedesigned } from './GridViewCardRedesigned/GridViewCardRedesigned';
import { GridViewCardDeprecated } from './GridViewCardDeprecated/GridViewCardDeprecated';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { BaseCardProps } from '../ArticleCard';

export const GridViewCard = memo((props: BaseCardProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<GridViewCardRedesigned {...props} />}
            off={<GridViewCardDeprecated {...props} />}
        />
    );
});

import { memo } from 'react';
import { ListViewCardRedesigned } from './ListViewCardRedesigned/ListViewCardRedesigned';
import { ListViewCardDeprecated } from './ListViewCardDeprecated/ListViewCardDeprecated';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { BaseCardProps } from '../ArticleCard';

export const ListViewCard = memo((props: BaseCardProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ListViewCardRedesigned {...props} />}
            off={<ListViewCardDeprecated {...props} />}
        />
    );
});

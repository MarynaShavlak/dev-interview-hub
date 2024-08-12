import { memo } from 'react';
import { RedesignedListViewItem } from './RedesignedListViewItem/RedesignedListViewItem';
import { DeprecatedListViewItem } from './DeprecatedListViewItem/DeprecatedListViewItem';
import { Article } from '../../../model/types/article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export interface ListViewItemProps {
    className?: string;
    article: Article;
    index: number;
}

export const ListViewItem = memo((props: ListViewItemProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedListViewItem {...props} />}
            off={<DeprecatedListViewItem {...props} />}
        />
    );
});

import { memo } from 'react';
import { RedesignedListViewItem } from './RedesignedListViewItem/RedesignedListViewItem';
import { DeprecatedListViewItem } from './DeprecatedListViewItem/DeprecatedListViewItem';
import { Article } from '../../../../model/types/article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface ListViewItemProps {
    className?: string;
    article: Article;
}

export const ListViewItem = memo((props: ListViewItemProps) => {
    const { className, article } = props;

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <RedesignedListViewItem
                    article={article}
                    className={className}
                />
            }
            off={
                <DeprecatedListViewItem
                    article={article}
                    className={className}
                />
            }
        />
    );
});

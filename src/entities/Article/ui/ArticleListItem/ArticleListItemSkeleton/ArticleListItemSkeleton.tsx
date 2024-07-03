import { memo } from 'react';
import { ListViewSkeleton } from './ListViewSkeleton/ListViewSkeleton';
import { GridViewSkeleton } from './GridViewSkeleton/GridViewSkeleton';
import { ArticleView } from '../../../model/consts/articleConsts';

export interface ArticleListItemSkeletonProps {
    view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { view } = props;

        if (view === ArticleView.LIST) {
            return <ListViewSkeleton />;
        }
        return <GridViewSkeleton />;
    },
);

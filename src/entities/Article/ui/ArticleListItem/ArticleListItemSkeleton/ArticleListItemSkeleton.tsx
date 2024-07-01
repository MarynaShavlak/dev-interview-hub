import { memo } from 'react';
import { ListViewSkeleton } from './ListViewSkeleton/ListViewSkeleton';
import { GridViewSkeleton } from './GridViewSkeleton/GridViewSkeleton';
import { ArticleView } from '../../../model/consts/consts';

export interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { className, view } = props;

        if (view === ArticleView.LIST) {
            return <ListViewSkeleton view={view} className={className} />;
        }
        return <GridViewSkeleton view={view} className={className} />;
    },
);

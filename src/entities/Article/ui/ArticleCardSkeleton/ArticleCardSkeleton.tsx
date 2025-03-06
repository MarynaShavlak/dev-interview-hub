import { memo } from 'react';
import { ListViewSkeleton } from './ListViewSkeleton/ListViewSkeleton';
import { GridViewSkeleton } from './GridViewSkeleton/GridViewSkeleton';
import { ArticleView } from '../../model/consts/articleConsts';
import { SequenceViewSkeleton } from './SequenceViewSkeleton/SequenceViewSkeleton';

export interface ArticleListItemSkeletonProps {
    view: ArticleView;
}

export const ArticleCardSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { view } = props;

        if (view === ArticleView.LIST) {
            return <ListViewSkeleton />;
        }
        if (view === ArticleView.SEQUENCE) {
            return <SequenceViewSkeleton />;
        }
        return <GridViewSkeleton />;
    },
);

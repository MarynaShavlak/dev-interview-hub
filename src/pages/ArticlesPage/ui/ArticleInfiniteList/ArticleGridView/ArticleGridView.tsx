import React, { memo, RefObject } from 'react';
import { VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso';
import cls from '../ArticleInfiniteList.module.scss';
import { ArticleListSkeleton, ArticleView } from '@/entities/Article';
import { CommonPropsType } from '../ArticleInfiniteList';
import { ArticlesInfiniteListHeader } from '../ArticlesInfiniteListHeader/ArticlesInfiniteListHeader';

interface ArticleGridViewProps extends CommonPropsType {
    gridRef: RefObject<VirtuosoGridHandle>;
}

export const ArticleGridView = memo((props: ArticleGridViewProps) => {
    const { itemContent, gridRef, endReached, data } = props;
    const ScrollSeekPlaceholder = memo(() => (
        <ArticleListSkeleton view={ArticleView.GRID} />
    ));
    return (
        <VirtuosoGrid
            itemContent={itemContent}
            data={data}
            endReached={endReached}
            ref={gridRef}
            components={{
                ScrollSeekPlaceholder,
                Header: ArticlesInfiniteListHeader,
            }}
            style={{
                height: 'calc(100vh - 80px)',
            }}
            listClassName={cls.itemsWrapper}
            scrollSeekConfiguration={{
                enter: (velocity) => Math.abs(velocity) > 200,
                exit: (velocity) => Math.abs(velocity) < 30,
            }}
            data-testid="ArticleList"
        />
    );
});

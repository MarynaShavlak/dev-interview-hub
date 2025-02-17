import React, { memo, RefObject } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { ArticleListSkeleton, ArticleView } from '@/entities/Article';
import cls from '../ArticleInfiniteList.module.scss';
import { CommonPropsType } from '../ArticleInfiniteList';
import { ArticlesInfiniteListHeader } from '../ArticlesInfiniteListHeader/ArticlesInfiniteListHeader';

interface ArticleListViewProps extends CommonPropsType {
    listRef: RefObject<VirtuosoHandle>;
    isLoading: boolean;
    scrollStopArticleIndex: number;
}
const Footer = memo(({ isLoading }: { isLoading: boolean }) => {
    if (isLoading) {
        return <ArticleListSkeleton view={ArticleView.LIST} />;
    }
    return null;
});

export const ArticleListView = memo((props: ArticleListViewProps) => {
    const {
        itemContent,
        endReached,
        data,
        listRef,
        scrollStopArticleIndex,
        isLoading,
    } = props;

    return (
        <div className={cls.ArticlesPageDeprecated} data-testid="ArticleList">
            <Virtuoso
                itemContent={itemContent}
                data={data}
                endReached={endReached}
                ref={listRef}
                style={{
                    height: 'calc(100vh - 80px)',
                }}
                initialTopMostItemIndex={scrollStopArticleIndex}
                components={{
                    Footer: () => <Footer isLoading={isLoading} />,
                    Header: ArticlesInfiniteListHeader,
                }}
            />
        </div>
    );
});

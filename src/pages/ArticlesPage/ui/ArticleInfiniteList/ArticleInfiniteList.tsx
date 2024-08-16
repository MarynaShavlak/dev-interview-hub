import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { RedesignedArticleInfiniteList } from './RedesignedArticleInfiniteList/RedesignedArticleInfiniteList';
import { DeprecatedArticleInfiniteList } from './DeprecatedArticleInfiniteList/DeprecatedArticleInfiniteList';

export interface ArticleInfiniteListProps {
    onInfiniteScroll: () => void;
}

export const ArticleInfiniteList = memo(
    ({ onInfiniteScroll }: ArticleInfiniteListProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <RedesignedArticleInfiniteList
                        onInfiniteScroll={onInfiniteScroll}
                    />
                }
                off={
                    <DeprecatedArticleInfiniteList
                        onInfiniteScroll={onInfiniteScroll}
                    />
                }
            />
        );
    },
);

import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import { ArticlesPageProps } from '../ArticlesPage';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';

import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../../model/slices/articlesPageSlice';
import { useArticleListFetcher } from '../../../lib/hooks/useArticlesPage/useArticleListFetcher';
import cls from '../ArticlesPage.module.scss';
import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

export const RedesignedArticlesPage = (props: ArticlesPageProps) => {
    const { onLoadNextPart } = useArticleListFetcher();

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <StickyContentLayout
                left={<ViewSelectorContainer />}
                right={<FiltersContainer />}
                content={
                    <main
                        className={cls.ArticlesPageRedesigned}
                        data-testid="ArticlesPage"
                    >
                        <ArticleInfiniteList
                            onInfiniteScroll={onLoadNextPart}
                        />
                        <ArticlePageGreeting />
                    </main>
                }
            />
        </DynamicModuleLoader>
    );
};

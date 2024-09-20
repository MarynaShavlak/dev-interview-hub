import { ArticlesPageProps } from '../ArticlesPage';
import { useArticleListFetcher } from '../../../lib/hooks/useArticlesPage/useArticleListFetcher';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../../model/slices/articlesPageSlice';
import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};
export const DeprecatedArticlesPage = (props: ArticlesPageProps) => {
    const { onLoadNextPart } = useArticleListFetcher();
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <ArticleInfiniteList onInfiniteScroll={onLoadNextPart} />
            <ArticlePageGreeting />
        </DynamicModuleLoader>
    );
};

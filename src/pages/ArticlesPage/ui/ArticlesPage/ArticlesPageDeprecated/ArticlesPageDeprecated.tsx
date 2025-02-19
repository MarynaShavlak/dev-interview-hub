import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../../model/slices/articlesPageSlice';
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';
import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';
import { useArticlesPageInit } from '../../../lib/hooks/useArticlesPageInit/useArticlesPageInit';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};
export const ArticlesPageDeprecated = () => {
    const { onLoadNextPart } = useArticlesPageInit();
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <ArticleInfiniteList onInfiniteScroll={onLoadNextPart} />
            <ArticlePageGreeting />
        </DynamicModuleLoader>
    );
};

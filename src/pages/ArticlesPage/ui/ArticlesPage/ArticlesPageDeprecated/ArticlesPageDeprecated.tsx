import { ArticlesPageProps } from '../ArticlesPage';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../../model/slices/articlesPageSlice';
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';
import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};
export const ArticlesPageDeprecated = (props: ArticlesPageProps) => {
    // const { onLoadNextPart } = useArticleListFetcher();
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <ArticleInfiniteList
            // onInfiniteScroll={onLoadNextPart}
            />
            <ArticlePageGreeting />
        </DynamicModuleLoader>
    );
};

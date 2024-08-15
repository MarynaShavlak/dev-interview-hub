import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import { ArticlesPageProps } from '../ArticlesPage';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';
import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../../model/slices/articlesPageSlice';
import { useArticleListFetcher } from '../../../lib/hooks/useArticlesPage/useArticleListFetcher';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

export const RedesignedArticlesPage = ({ className }: ArticlesPageProps) => {
    // const dispatch = useAppDispatch();
    // const [searchParams] = useSearchParams();
    //
    // useInitialEffect(() => {
    //     dispatch(initArticlesPage(searchParams));
    // });
    const { onLoadNextPart } = useArticleListFetcher();

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <StickyContentLayout
                left={<ViewSelectorContainer />}
                right={<FiltersContainer />}
                content={
                    <main className={className} data-testid="ArticlesPage">
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

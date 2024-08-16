import { ArticlesPageProps } from '../ArticlesPage';
import { useArticleListFetcher } from '../../../lib/hooks/useArticlesPage/useArticleListFetcher';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../../model/slices/articlesPageSlice';
import { DeprecatedArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
// import cls from '../ArticlesPage.module.scss';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};
export const DeprecatedArticlesPage = ({ className }: ArticlesPageProps) => {
    const { onLoadNextPart } = useArticleListFetcher();
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <DeprecatedArticleInfiniteList onInfiniteScroll={onLoadNextPart} />
            <ArticlePageGreeting />

            {/*        onInfiniteScroll={onLoadNextPart} */}
            {/*    />
            {/* <div className={cls.page}> */}
            {/*    <div className={cls.controlsWrap}> */}
            {/*        <FiltersContainer /> */}
            {/*        <ViewSelectorContainer className={cls.viewSelector} /> */}
            {/*    </div> */}
            {/*    <DeprecatedArticleInfiniteList */}
            {/*        onInfiniteScroll={onLoadNextPart} */}
            {/*    /> */}
            {/* </div> */}
        </DynamicModuleLoader>
    );
};

// export const DeprecatedArticlesPage = ({ className }: ArticlesPageProps) => {
//     return (
//         <Page
//             data-testid="ArticlesPage"
//             className={classNames(cls.ArticlesPage, {}, [className])}
//         >
//             <div className={cls.controlsWrap}>
//                 <FiltersContainer />
//                 <ViewSelectorContainer className={cls.viewSelector} />
//             </div>
//
//             <ArticleInfiniteList className={cls.list} />
//             <ArticlePageGreeting />
//         </Page>
//     );
// };

// export const DeprecatedArticlesPage = ({ className }: ArticlesPageProps) => {
//     return (
//         <Page
//             data-testid="ArticlesPage"
//             className={classNames(cls.ArticlesPage, {}, [className])}
//         >
//             <div className={cls.controlsWrap}>
//                 <FiltersContainer />
//                 <ViewSelectorContainer className={cls.viewSelector} />
//             </div>
//
//             <ArticleInfiniteList className={cls.list} />
//             <ArticlePageGreeting />
//         </Page>
//     );
// <main
//     data-testid="ArticlesPage"
//     className={classNames('', {}, [className])}
// >
//     <div className={cls.controlsWrap}>
//         <FiltersContainer />
//         <ViewSelectorContainer className={cls.viewSelector} />
//     </div>
//
//
// </main>
// };

export { getFilteredArticlesQuery } from './api/articleApi';

export { useGetFilteredArticles } from './api/articleApi';

export { updateArticleViewsThunk } from './model/services/updateArticleViewsThunk/updateArticleViewsThunk';

export { useArticleNavigation } from './lib/hooks/useArticleNavigation/useArticleNavigation';

export { deleteArticleThunk } from './model/services/deleteArticleThunk/deleteArticleThunk';

export { deleteArticleImageThunk } from '@/entities/Article/model/services/deleteArticleImageThunk/deleteArticleImageThunk';

export { uploadArticleImageThunk } from './model/services/uploadArticleImageThunk/uploadImageThunk';

export { ArticleBlockPreview } from './ui/ArticleBlockPreview/ArticleBlockPreview';

export { ArticleTextBlockComponent } from './ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
export { ArticleCodeBlockComponent } from './ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
export { ArticleImageBlockComponent } from './ui/ArticleImageBlockComponent/ArticleImageBlockComponent';
export type {
    ArticleBlock,
    ArticleTextBlock,
    ArticleCodeBlock,
    ArticleImageBlock,
} from './model/types/article';

export { useArticleDataById } from './api/articleApi';

export { selectAllArticles } from './api/articleApi';

export { articleFirebaseApi } from './api/articleApi';

export { articleReducer } from './model/slices/articleSlice';

export { getArticles } from './model/slices/articleSlice';

export { ArticleSection } from './model/consts/articleConsts';

export type { Article } from './model/types/article';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export {
    ArticleView,
    ArticleSortField,
    ArticleCategory,
} from './model/consts/articleConsts';
// export {
//     getArticleDetailsData,
//     useArticleDetailsData,
//     useArticleDetailsIsLoading,
//     useArticleDetailsError,
// } from './model/selectors/articleDetails';
export { ArticleList } from './ui/ArticleList/ArticleList';
export { NoArticlesFound } from './ui/ArticleList/NoArticlesFound/NoArticlesFound';
export { ArticleCard } from './ui/ArticleCard/ArticleCard';
export { ArticleListSkeleton } from './ui/ArticleList/ArticleListSkeleton/ArticleListSkeleton';
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
export {
    useGetArticles,
    useArticlesByUserId,
    getArticlesQuery,
    getArticleDataByIdQuery,
    addArticleMutation,
    updateArticleMutation,
} from './api/articleApi';

import { Article, ArticleCategory } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

interface ArticleRecommendationsParams {
    limit: number;
    category: ArticleCategory;
    exceptArticleId: string;
}

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<
            Article[],
            ArticleRecommendationsParams
        >({
            query: ({ limit, category, exceptArticleId }) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                    _expand: 'user',
                    id_ne: exceptArticleId,
                    category:
                        category === ArticleCategory.ALL ? undefined : category,
                },
            }),
        }),
    }),
});

export const useArticleRecommendationsList =
    recommendationsApi.useGetArticleRecommendationsListQuery;

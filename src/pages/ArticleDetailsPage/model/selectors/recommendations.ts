import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useArticleRecommendationsIsLoading, getArticleRecommendationsIsLoading] = buildSelector((state: StateSchema) => {
    return state.articleDetailsPage?.recommendations?.isLoading;
});

export const [useArticleRecommendationsError, getArticleRecommendationsError] = buildSelector((state: StateSchema) => {
    return state.articleDetailsPage?.recommendations?.error;
});

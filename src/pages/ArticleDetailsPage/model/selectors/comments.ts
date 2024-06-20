import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useArticleCommentsIsLoading, getArticleCommentsIsLoading] = buildSelector((state: StateSchema) => {
    return state.articleDetailsPage?.comments?.isLoading;
});
export const [useArticleCommentsError, getArticleCommentsError] = buildSelector((state: StateSchema) => {
    return state.articleDetailsPage?.comments?.error;
});

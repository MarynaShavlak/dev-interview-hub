import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useArticleDetailsData, getArticleDetailsData] = buildSelector(
    (state: StateSchema) => state.articleDetails?.data,
);
export const [useArticleDetailsIsLoading, getArticleDetailsIsLoading] =
    buildSelector(
        (state: StateSchema) => state.articleDetails?.isLoading || false,
    );
export const [useArticleDetailsError, getArticleDetailsError] = buildSelector(
    (state: StateSchema) => state.articleDetails?.error,
);

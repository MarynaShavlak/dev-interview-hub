import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';

export const [useCreateArticleForm, getCreateArticleForm] = buildSelector(
    (state: StateSchema) => state.createArticle?.form,
);

export const [useCreateArticleIsLoading, getCreateArticleIsLoading] =
    buildSelector((state: StateSchema) => state.createArticle?.isLoading);

export const [useCreateArticleError, getCreateArticleError] = buildSelector(
    (state: StateSchema) => state.createArticle?.error,
);

// export const [useUploadedArticleImage, getUploadedArticle] = buildSelector(
//     (state: StateSchema) => state.createArticle?.uploadedArticleImage,
// );

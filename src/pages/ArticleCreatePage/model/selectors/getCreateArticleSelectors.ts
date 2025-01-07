import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';

export const [useArticleFormData, getArticleFormData] = buildSelector(
    (state: StateSchema) => state.createArticle?.form,
);

export const [useArticleUploadPreview, getArticleUploadPreview] = buildSelector(
    (state: StateSchema) => state.createArticle?.uploadedArticleImage,
);

import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';

export const [useCreateArticleForm, getCreateArticleForm] = buildSelector(
    (state: StateSchema) => state.createArticle?.form,
);

export const [useUploadedArticleImage, getUploadedArticleImage] = buildSelector(
    (state: StateSchema) => state.createArticle?.uploadedArticleImage,
);

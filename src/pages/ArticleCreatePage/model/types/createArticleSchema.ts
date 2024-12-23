import { Article } from '@/entities/Article';

export interface CreateArticleSchema {
    form: Article;
    isLoading: boolean;
    error?: string;
    uploadedArticleImage?: null | File;

    // uploadedProfilePhoto?: null | File;
}

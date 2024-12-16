import { Article } from '@/entities/Article';

export interface CreateArticleSchema {
    form: Article;
    isLoading: boolean;
    error?: string;

    // uploadedProfilePhoto?: null | File;
}

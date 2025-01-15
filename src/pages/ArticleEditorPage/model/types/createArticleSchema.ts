import { Article } from '@/entities/Article';

export interface CreateArticleSchema {
    form: Article;
    uploadedArticleImage?: null | File;
    isEdit: boolean;
}

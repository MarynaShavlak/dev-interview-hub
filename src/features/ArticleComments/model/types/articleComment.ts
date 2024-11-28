import { Comment } from '@/entities/Comment';

export interface ArticleComment extends Comment {
    articleId: string;
}

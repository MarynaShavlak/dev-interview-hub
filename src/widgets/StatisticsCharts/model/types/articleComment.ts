import { User } from '@/entities/User';

export interface ArticleComment extends Comment {
    articleId: string;
    user: User;
}

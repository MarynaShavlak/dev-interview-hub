import { Article } from '@/entities/Article';

export interface ArticlePartial extends Omit<Article, 'category'> {
    categories: string;
}

export interface UserArticlesTableInfo extends ArticlePartial {
    comments: number;
    rating: number;
}

// export interface ArticlesByUserData {
//     [userId: string]: number;
// }

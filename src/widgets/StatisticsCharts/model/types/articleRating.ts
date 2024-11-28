import { RatingType } from '@/entities/Rating';

export interface ArticleRating extends RatingType {
    articleId: string;
}

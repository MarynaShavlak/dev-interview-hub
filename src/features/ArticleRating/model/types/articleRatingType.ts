import { RatingType } from '@/entities/Rating';

export interface ArticleRatingType extends RatingType {
    id: string;
    articleId: string;
    createdAt: string;
}

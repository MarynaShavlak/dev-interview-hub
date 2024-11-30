import { RatingData } from '@/entities/Rating';

export interface ArticleRatingData extends RatingData {
    id: string;
    articleId: string;
    createdAt: string;
}

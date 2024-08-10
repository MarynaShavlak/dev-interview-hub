import { ArticleCommentsSchema } from '@/widgets/ArticleComments';
import { ArticleRecommendationsSchema } from '@/features/articleRecommendationsList';

export interface ArticleDetailsPageSchema {
    comments: ArticleCommentsSchema;
    recommendations: ArticleRecommendationsSchema;
}

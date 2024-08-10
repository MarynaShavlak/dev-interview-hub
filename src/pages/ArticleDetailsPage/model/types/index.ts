import { ArticleDetailsRecommendationsSchema } from './ArticleDetailsRecommendationsSchema';
import { ArticleCommentsSchema } from '@/widgets/ArticleComments';

export interface ArticleDetailsPageSchema {
    comments: ArticleCommentsSchema;
    recommendations: ArticleDetailsRecommendationsSchema;
}

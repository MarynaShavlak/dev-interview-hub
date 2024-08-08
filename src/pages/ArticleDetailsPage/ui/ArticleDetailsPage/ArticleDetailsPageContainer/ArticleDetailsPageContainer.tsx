import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/ui/redesigned/Stack';
import {
    useArticleDetailsData,
    useArticleDetailsError,
} from '@/entities/Article';
import { DetailsContainer } from '../../DetailsContainer/DetailsContainer';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleComments } from '@/widgets/ArticleComments';
import { ArticleRating } from '@/features/articleRating';

export const ArticleDetailsPageContainer = memo(() => {
    const { id } = useParams<{ id: string }>();
    const error = useArticleDetailsError();
    const article = useArticleDetailsData();

    return (
        <VStack gap="16" max>
            <DetailsContainer />
            {article && !error && (
                <>
                    <ArticleRating articleId={id} />
                    <ArticleRecommendationsList />
                    <ArticleComments id={id} />
                </>
            )}
        </VStack>
    );
});

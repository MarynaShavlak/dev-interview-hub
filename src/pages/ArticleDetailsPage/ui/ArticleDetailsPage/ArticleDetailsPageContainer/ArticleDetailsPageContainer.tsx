import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/ui/redesigned/Stack';
import {
    ArticleDetails,
    useArticleDetailsData,
    useArticleDetailsError,
} from '@/entities/Article';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleComments } from '@/widgets/ArticleComments';
import { ArticleRating } from '@/features/articleRating';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleDetailsPageHeader } from '../DeprecatedArticleDetailsPage/ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export const ArticleDetailsPageContainer = memo(() => {
    const { id } = useParams<{ id: string }>();
    const error = useArticleDetailsError();
    const article = useArticleDetailsData();

    return (
        <VStack gap="16" max>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Card max fullHeight border="round" padding="24">
                        <ArticleDetails id={id} />
                    </Card>
                }
                off={
                    <>
                        <ArticleDetailsPageHeader />
                        <ArticleDetails id={id} />
                    </>
                }
            />
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

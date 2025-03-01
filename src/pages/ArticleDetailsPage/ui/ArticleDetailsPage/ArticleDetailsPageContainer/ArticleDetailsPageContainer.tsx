import { memo } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import {
    ArticleDetails,
    useArticleDataById,
    // useArticleDetailsData,
    // useArticleDetailsError,
} from '@/entities/Article';
// import { ArticleComments } from '@/features/ArticleComments';
// import { ArticleRating } from '@/features/ArticleRating';
import { Card } from '@/shared/ui/redesigned/Card';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { useUserAuthData } from '@/entities/User';
import { ArticleControls } from '@/widgets/ArticleControls';
import { ArticleComments } from '@/features/ArticleComments';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
// import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';

interface ArticleDetailsPageContainerProps {
    id: string;
}

export const ArticleDetailsPageContainer = memo(
    ({ id }: ArticleDetailsPageContainerProps) => {
        const { data: article, isLoading, error } = useArticleDataById(id);

        const currentUserdata = useUserAuthData();
        const articleAuthorId = article?.user.id;
        console.log('articleAuthorId', articleAuthorId);
        const authedUserId = currentUserdata?.id;
        console.log('authedUserId', authedUserId);

        if (!id || !article) return null;

        return (
            <VStack gap="16" max>
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={
                        <Card fullHeight border="round" padding="24">
                            <ArticleDetails id={id} />
                        </Card>
                    }
                    off={
                        <>
                            <ArticleControls article={article} />
                            <ArticleDetails id={id} />
                        </>
                    }
                />
                {article && !error && (
                    <>
                        {articleAuthorId !== authedUserId && (
                            <ArticleRating articleId={id} />
                        )}

                        <ArticleRecommendationsList id={id} />
                        <ArticleComments id={id} />
                    </>
                )}
            </VStack>
        );
    },
);

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
import { ArticleComments } from '@/features/ArticleComments';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { EntityControls } from '@/widgets/EntityControls';
// import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';

interface ArticleDetailsPageContainerProps {
    id: string;
}

export const ArticleDetailsPageContainer = memo(
    ({ id }: ArticleDetailsPageContainerProps) => {
        const { data: article, isLoading, error } = useArticleDataById(id);

        const currentUserdata = useUserAuthData();
        const articleAuthorId = article?.user.id;

        const authedUserId = currentUserdata?.id;

        if (!id || !article) return null;

        return (
            <VStack gap="16" max>
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={
                        <Card fullHeight border="round" padding="24" max>
                            <ArticleDetails id={id} />
                        </Card>
                    }
                    off={
                        <>
                            <EntityControls
                                entity={article}
                                entityType="article"
                            />
                            {/* <ArticleControls article={article} /> */}
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

import { memo } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import {
    ArticleDetails,
    useArticleDataById,
    // useArticleDetailsData,
    // useArticleDetailsError,
} from '@/entities/Article';
import { ArticleComments } from '@/features/ArticleComments';
import { ArticleRating } from '@/features/ArticleRating';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleDetailsPageHeader } from '../DeprecatedArticleDetailsPage/ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { useUserAuthData } from '@/entities/User';

interface ArticleDetailsPageContainerProps {
    id: string;
}

export const ArticleDetailsPageContainer = memo(
    ({ id }: ArticleDetailsPageContainerProps) => {
        const { data: article, isLoading, error } = useArticleDataById(id);
        // const error = useArticleDetailsError();
        // const article = useArticleDetailsData();
        const currentUserdata = useUserAuthData();
        const articleAuthorId = article?.user.id;
        const authedUserId = currentUserdata?.id;

        console.log('article', article);
        if (!id) return null;

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
                            <ArticleDetailsPageHeader id={id} />
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

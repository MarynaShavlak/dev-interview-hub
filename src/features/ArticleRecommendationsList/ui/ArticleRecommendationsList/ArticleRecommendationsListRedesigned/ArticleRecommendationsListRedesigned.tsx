import { memo } from 'react';

import { Text } from '@/shared/ui/redesigned/Text';
import {
    ArticleListSkeleton,
    ArticleView,
    // useArticleDetailsData,
} from '@/entities/Article';
import { VStack } from '@/shared/ui/common/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Each } from '@/shared/lib/components/Each/Each';

import { ArticleRecommendationsListProps } from '../ArticleRecommendationsList';
import { useArticleRecommendations } from '../../../lib/hooks/useArticleRecommendations/useArticleRecommendations';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router/router';

export const ArticleRecommendationsListRedesigned = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className, id } = props;

        const {
            isLoading,
            articles,
            error,
            title,
            errorTitle,
            errorText,
            noRecommendsTitle,
            noRecommendsText,
        } = useArticleRecommendations(id);

        if (isLoading) {
            return (
                <VStack max gap="8">
                    <Skeleton width="100%" height={40} border="34px" />
                    <ArticleListSkeleton
                        view={ArticleView.GRID}
                        skeletonCount={3}
                    />
                </VStack>
            );
        }
        if (error) {
            return (
                <Text
                    size="l"
                    title={errorTitle}
                    text={errorText}
                    variant="error"
                />
            );
        }

        if (!articles || !articles.length) {
            return (
                <Text
                    size="l"
                    title={noRecommendsTitle}
                    text={noRecommendsText}
                    variant="error"
                />
            );
        }

        return (
            <VStack
                gap="24"
                className={className}
                data-testid="ArticleRecommendationsList"
            >
                <Text size="l" title={title} />
                <VStack gap="16" max>
                    <Each
                        of={articles}
                        render={(item, index) => {
                            return (
                                <AppLink to={getRouteArticleDetails(item.id)}>
                                    <Text size="l" text={item.title} />
                                </AppLink>

                                // <ArticleCard
                                //     article={item}
                                //     view={ArticleView.GRID}
                                //     target="_blank"
                                //     key={item.id}
                                //     index={index}
                                // />
                            );
                        }}
                    />
                </VStack>
            </VStack>
        );
    },
);

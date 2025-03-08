import React, { memo } from 'react';

import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleViews } from '@/entities/Article';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Each } from '@/shared/lib/components/Each/Each';

import { ArticleRecommendationsListProps } from '../ArticleRecommendationsList';
import { useArticleRecommendations } from '../../../lib/hooks/useArticleRecommendations/useArticleRecommendations';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router/router';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { ArticleRecommendationsListSkeleton } from '../ArticleRecommendationsListSkeleton/ArticleRecommendationsListSkeleton';
import { ArticleRecommendationsListError } from '../ArticleRecommendationsListError/ArticleRecommendationsListError';

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
            return <ArticleRecommendationsListSkeleton />;
        }
        if (error) {
            return (
                <ArticleRecommendationsListError
                    errorTitle={errorTitle}
                    errorText={errorText}
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
                                <HStack
                                    gap="16"
                                    align="center"
                                    max
                                    justify="between"
                                >
                                    <HStack gap="16" align="center">
                                        <OrderCard index={index + 1} />
                                        <AppLink
                                            to={getRouteArticleDetails(item.id)}
                                            target="_blank"
                                        >
                                            <Text size="m" text={item.title} />
                                        </AppLink>
                                    </HStack>
                                    <ArticleViews views={item.views} />
                                </HStack>
                            );
                        }}
                    />
                </VStack>
            </VStack>
        );
    },
);

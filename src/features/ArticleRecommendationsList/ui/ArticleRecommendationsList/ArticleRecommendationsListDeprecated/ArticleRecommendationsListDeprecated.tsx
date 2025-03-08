import React, { memo } from 'react';
import { useArticleRecommendations } from '../../../lib/hooks/useArticleRecommendations/useArticleRecommendations';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { ArticleCard, ArticleView } from '@/entities/Article';
import {
    Text as TextDeprecated,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Each } from '@/shared/lib/components/Each/Each';
import { ArticleRecommendationsListProps } from '../ArticleRecommendationsList';
import { ArticleRecommendationsListSkeleton } from '../ArticleRecommendationsListSkeleton/ArticleRecommendationsListSkeleton';
import { ArticleRecommendationsListError } from '../ArticleRecommendationsListError/ArticleRecommendationsListError';

export const ArticleRecommendationsListDeprecated = memo(
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
                <TextDeprecated
                    size={TextSize.L}
                    title={noRecommendsTitle}
                    text={noRecommendsText}
                    theme={TextTheme.ERROR}
                />
            );
        }

        return (
            <VStack
                gap="8"
                className={className}
                data-testid="ArticleRecommendationsList"
            >
                <TextDeprecated size={TextSize.L} title={title} />
                <HStack wrap="wrap" gap="24" justify="center" max>
                    <Each
                        of={articles}
                        render={(item, index) => {
                            return (
                                <ArticleCard
                                    article={item}
                                    view={ArticleView.GRID}
                                    target="_blank"
                                    key={item.id}
                                    index={index}
                                />
                            );
                        }}
                    />
                </HStack>
            </VStack>
        );
    },
);

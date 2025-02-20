import { memo } from 'react';
import { useArticleRecommendations } from '../../../lib/hooks/useArticleRecommendations/useArticleRecommendations';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import {
    ArticleCard,
    ArticleListSkeleton,
    ArticleView,
} from '@/entities/Article';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import {
    Text as TextDeprecated,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Each } from '@/shared/lib/components/Each/Each';
import { ArticleRecommendationsListProps } from '../ArticleRecommendationsList';

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
            return (
                <VStack max gap="8">
                    <SkeletonDeprecated
                        width="100%"
                        height={40}
                        border="34px"
                    />
                    <ArticleListSkeleton
                        view={ArticleView.GRID}
                        skeletonCount={3}
                    />
                </VStack>
            );
        }
        if (error) {
            return (
                <TextDeprecated
                    size={TextSize.L}
                    title={errorTitle}
                    text={errorText}
                    theme={TextTheme.ERROR}
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

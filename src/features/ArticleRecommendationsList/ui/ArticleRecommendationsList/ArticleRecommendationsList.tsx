import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    Text as TextDeprecated,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    ArticleCard,
    ArticleListSkeleton,
    ArticleView,
    // useArticleDetailsData,
} from '@/entities/Article';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Each } from '@/shared/lib/components/Each/Each';
import { useArticleRecommendations } from '../../lib/hooks/useArticleRecommendations/useArticleRecommendations';

export interface ArticleRecommendationsListProps {
    className?: string;
    id: string;
}

const ArticleRecommendationsList = memo(
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
                    <ToggleFeaturesComponent
                        feature="isAppRedesigned"
                        on={<Skeleton width="100%" height={40} border="34px" />}
                        off={
                            <SkeletonDeprecated
                                width="100%"
                                height={40}
                                border="34px"
                            />
                        }
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
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={
                        <Text
                            size="l"
                            title={errorTitle}
                            text={errorText}
                            variant="error"
                        />
                    }
                    off={
                        <TextDeprecated
                            size={TextSize.L}
                            title={errorTitle}
                            text={errorText}
                            theme={TextTheme.ERROR}
                        />
                    }
                />
            );
        }

        if (!articles || !articles.length) {
            return (
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={
                        <Text
                            size="l"
                            title={noRecommendsTitle}
                            text={noRecommendsText}
                            variant="error"
                        />
                    }
                    off={
                        <TextDeprecated
                            size={TextSize.L}
                            title={noRecommendsTitle}
                            text={noRecommendsText}
                            theme={TextTheme.ERROR}
                        />
                    }
                />
            );
        }

        return (
            <VStack
                gap="8"
                className={className}
                data-testid="ArticleRecommendationsList"
            >
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text size="l" title={title} />}
                    off={<TextDeprecated size={TextSize.L} title={title} />}
                />
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={
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
                    }
                    off={
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
                    }
                />
            </VStack>
        );
    },
);

export default ArticleRecommendationsList;

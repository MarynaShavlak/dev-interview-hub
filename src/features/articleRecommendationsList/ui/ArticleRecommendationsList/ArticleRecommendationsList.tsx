import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    ArticleCategory,
    ArticleList,
    ArticleListSkeleton,
    ArticleView,
    useArticleDetailsData,
} from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

export interface ArticleRecommendationsListProps {
    className?: string;
}

const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className } = props;
        const article = useArticleDetailsData();
        const articleCategory = article?.category[0] || ArticleCategory.ALL;

        const { t } = useTranslation('article-details');
        const {
            isLoading,
            data: articles,
            error,
        } = useArticleRecommendationsList({
            limit: 3,
            category: articleCategory,
            exceptArticleId: article?.id || '0',
        });

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

        if (error || !articles) {
            return null;
        }
        const title = t('Рекомендуємо');
        return (
            <VStack gap="8" className={className}>
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text size="l" title={title} />}
                    off={<TextDeprecated size={TextSize.L} title={title} />}
                />
                <ArticleList articles={articles} target="_blank" />
            </VStack>
        );
    },
);

export default ArticleRecommendationsList;

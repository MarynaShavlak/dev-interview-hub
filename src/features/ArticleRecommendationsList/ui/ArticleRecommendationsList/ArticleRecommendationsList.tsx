import { useTranslation } from 'react-i18next';
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
    useArticleDataById,
    // useArticleDetailsData,
} from '@/entities/Article';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { useArticlesRecomendations } from '../../api/articleRecommendationsApi';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Each } from '@/shared/lib/components/Each/Each';

export interface ArticleRecommendationsListProps {
    className?: string;
    id: string;
}

const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className, id } = props;
        const { t } = useTranslation('articleDetails');
        const { data: article } = useArticleDataById(id);
        // console.log('aaaaa', article);
        const title = t('Рекомендуємо');
        const articleCategory = article?.category;
        const errorTitle = t('Помилка завантаження рекомендацій');

        const errorText = t(
            'На жаль, не вдалося завантажити рекомендації. Спробуйте пізніше.',
        );
        const noRecommendsTitle = t('Немає доступних рекомендацій');
        const noRecommendsText = t(
            'Наразі немає доступних рекомендацій. Будь ласка, перевірте пізніше.',
        );

        // const {
        //     isLoading,
        //     data: articles,
        //     error,
        // } = useArticleRecommendationsList({
        //     limit: 3,
        //     category: articleCategory,
        //     exceptArticleId: article?.id || '0',
        // });

        const {
            isLoading,
            data: articles,
            error,
        } = useArticlesRecomendations({
            limit: 3,
            category: articleCategory || [],
            exceptArticleId: article?.id || '0',
        });
        // const mainClass = toggleFeatures({
        //     name: 'isAppRedesigned',
        //     on: () => cls.ArticleListRedesigned,
        //     off: () => cls.ArticleList,
        // });
        // const classes = classNames(mainClass, {}, [className, cls[view]]);

        console.log('recommends', articles);

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
                <HStack wrap="wrap" gap="16">
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

                {/* <ArticleList */}
                {/*    articles={articles} */}
                {/*    target="_blank" */}
                {/*    view={ArticleView.GRID} */}
                {/* /> */}
            </VStack>
        );
    },
);

export default ArticleRecommendationsList;

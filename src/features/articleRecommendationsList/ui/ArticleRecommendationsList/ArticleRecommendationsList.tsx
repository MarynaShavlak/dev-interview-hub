import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    ArticleCategory,
    ArticleList,
    useArticleDetailsData,
} from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useArticleRecommendationsList } from '../../api/aritcleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(
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

        if (isLoading || error || !articles) {
            return null;
        }
        const title = t('Рекомендуємо');
        return (
            <VStack gap="8" className={classNames('', {}, [className])}>
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

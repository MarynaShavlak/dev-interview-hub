import { useTranslation } from 'react-i18next';
import { useArticlesRecomendations } from '../../../api/articleRecommendationsApi';
import { useArticleDataById } from '@/entities/Article';

export const useArticleRecommendations = (articleId: string) => {
    const { t } = useTranslation('articleDetails');
    const { data: article } = useArticleDataById(articleId);
    const {
        data: articles,
        isLoading,
        error,
    } = useArticlesRecomendations({
        limit: 3,
        category: article?.category || [],
        exceptArticleId: articleId || '0',
    });

    const title = t('Рекомендуємо');
    const errorTitle = t('Помилка завантаження рекомендацій');
    const errorText = t(
        'На жаль, не вдалося завантажити рекомендації. Спробуйте пізніше.',
    );
    const noRecommendsTitle = t('Немає доступних рекомендацій');
    const noRecommendsText = t(
        'Наразі немає доступних рекомендацій. Будь ласка, перевірте пізніше.',
    );

    return {
        isLoading,
        articles,
        error,
        title,
        errorTitle,
        errorText,
        noRecommendsTitle,
        noRecommendsText,
    };
};

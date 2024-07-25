import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { useArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit } from '@/shared/const/router/router';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';

export const ArticleEditNavigationButton = memo(() => {
    const { t } = useTranslation('article-details');
    const article = useArticleDetailsData();

    const navigate = useNavigate();

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [article, navigate]);

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<Button onClick={onEditArticle}>{t('Редагувати')}</Button>}
            off={
                <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEditArticle}
                >
                    {t('Редагувати статтю')}
                </ButtonDeprecated>
            }
        />
    );
});

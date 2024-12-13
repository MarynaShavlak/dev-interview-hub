import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
// import { useArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit } from '@/shared/const/router/router';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { useArticleDataById } from '@/entities/Article';

interface ArticleEditNavigationButtonProps {
    id: string;
}

export const ArticleEditNavigationButton = memo(
    ({ id }: ArticleEditNavigationButtonProps) => {
        const { t } = useTranslation('articleDetails');
        const { data: article, isLoading, error } = useArticleDataById(id);

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
    },
);

import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
// import { useArticleDetailsData } from '@/entities/Article';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import {
    useArticleDataById,
    useEditArticleNavigation,
} from '@/entities/Article';

interface ArticleEditNavigationButtonProps {
    id: string;
    max?: boolean;
}

export const ArticleEditNavigationButton = memo(
    ({ id, max = false }: ArticleEditNavigationButtonProps) => {
        const { t } = useTranslation('articleDetails');
        const { data: article, isLoading, error } = useArticleDataById(id);
        const { navigateToEditArticle } = useEditArticleNavigation();

        const onEditArticle = useCallback(() => {
            if (article) {
                navigateToEditArticle(article.id);
            }
        }, [article, navigateToEditArticle]);

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Button onClick={onEditArticle} max={max}>
                        {t('Редагувати')}
                    </Button>
                }
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

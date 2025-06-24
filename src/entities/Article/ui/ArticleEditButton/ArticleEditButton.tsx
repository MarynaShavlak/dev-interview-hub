import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { useArticleDataById } from '../../api/articleApi';
import { useEditArticleNavigation } from '../../lib/hooks/useEditArticleNavigation/useEditArticleNavigation';

export const ArticleEditButton = memo(
    ({ id, max }: { id: string; max: boolean }) => {
        const { t } = useTranslation();
        const articleData = useArticleDataById(id);
        const { navigateToEditArticle } = useEditArticleNavigation();

        const onEditEntity = useCallback(() => {
            if (articleData.data) {
                navigateToEditArticle(articleData.data.id);
            }
        }, [articleData.data, navigateToEditArticle]);

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Button variant="outline" max={max} onClick={onEditEntity}>
                        {t('Редагувати')}
                    </Button>
                }
                off={
                    <ButtonDeprecated
                        theme={ButtonTheme.OUTLINE}
                        onClick={onEditEntity}
                    >
                        {t('Редагувати статтю')}
                    </ButtonDeprecated>
                }
            />
        );
    },
);

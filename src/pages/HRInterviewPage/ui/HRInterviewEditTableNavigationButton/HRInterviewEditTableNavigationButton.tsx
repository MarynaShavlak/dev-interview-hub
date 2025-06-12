import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { getRouteHRInterviewEditor } from '@/shared/const/router/router';

import cls from './HRInterviewEditTableNavigationButton.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    ButtonTheme,
    Button as ButtonDeprecated,
} from '@/shared/ui/deprecated/Button';

export const HRInterviewEditTableNavigationButton = memo(() => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onNavigateToEditTable = useCallback(() => {
        navigate(getRouteHRInterviewEditor());
    }, [navigate]);

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Button
                    size="s"
                    onClick={onNavigateToEditTable}
                    className={cls.ArticleListButton}
                    max
                >
                    {t('Редагувати відповіді')}
                </Button>
            }
            off={
                <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={onNavigateToEditTable}
                >
                    {t('Редагувати відповіді')}
                </ButtonDeprecated>
            }
        />
    );
});

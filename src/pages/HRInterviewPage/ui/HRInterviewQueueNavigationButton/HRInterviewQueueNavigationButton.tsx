import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { getRouteHRInterviewQueue } from '@/shared/const/router/router';

import cls from './HRInterviewQueueNavigationButton.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    ButtonTheme,
    Button as ButtonDeprecated,
} from '@/shared/ui/deprecated/Button';

export const HRInterviewQueueNavigationButton = memo(() => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onNavigateToQueue = useCallback(() => {
        navigate(getRouteHRInterviewQueue());
    }, [navigate]);

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Button
                    size="s"
                    onClick={onNavigateToQueue}
                    className={cls.ArticleListButton}
                    max
                >
                    {t('Питання в черзі')}
                </Button>
            }
            off={
                <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={onNavigateToQueue}
                >
                    {t('Питання в черзі')}
                </ButtonDeprecated>
            }
        />
    );
});

import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleFeaturesComponent } from '@/shared/lib/features';

import cls from './HRInterviewEditTableNavigationButton.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    ButtonTheme,
    Button as ButtonDeprecated,
} from '@/shared/ui/deprecated/Button';
import { useInterviewTableNavigation } from '@/entities/HRInterviewQA';

export const HRInterviewEditTableNavigationButton = memo(() => {
    const { t } = useTranslation();
    const { onNavigateToInterviewTable } = useInterviewTableNavigation();

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Button
                    size="s"
                    onClick={onNavigateToInterviewTable}
                    className={cls.ArticleListButton}
                    max
                >
                    {t('Редагувати відповіді')}
                </Button>
            }
            off={
                <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={onNavigateToInterviewTable}
                >
                    {t('Редагувати відповіді')}
                </ButtonDeprecated>
            }
        />
    );
});

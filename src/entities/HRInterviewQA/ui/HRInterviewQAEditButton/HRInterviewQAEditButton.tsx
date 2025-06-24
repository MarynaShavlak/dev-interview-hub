import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { useEditHRInterviewQANavigation } from '../../lib/hooks/useEditHRInterviewQANavigation/useEditHRInterviewQANavigation';
import { useHRInterviewQADataById } from '../../api/hrInterviewApi';

export const HRInterviewQAEditButton = memo(
    ({ id, max }: { id: string; max: boolean }) => {
        const { t } = useTranslation();
        const hrInterviewQaData = useHRInterviewQADataById(id);
        const { navigateToEditHRInterviewQA } =
            useEditHRInterviewQANavigation();

        const onEditEntity = useCallback(() => {
            if (hrInterviewQaData.data) {
                navigateToEditHRInterviewQA(hrInterviewQaData.data.id);
            }
        }, [hrInterviewQaData.data, navigateToEditHRInterviewQA]);

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
                        {t('Редагувати питання')}
                    </ButtonDeprecated>
                }
            />
        );
    },
);

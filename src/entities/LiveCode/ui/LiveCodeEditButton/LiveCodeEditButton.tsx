import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { useLiveCodeDataById } from '../../api/liveCodeApi';
import { useEditLiveCodeTaskNavigation } from '../../lib/hooks/useEditLiveCodeTaskNavigation/useEditLiveCodeTaskNavigation';

export const LiveCodeEditButton = memo(
    ({ id, max }: { id: string; max: boolean }) => {
        const { t } = useTranslation();
        const liveCodeData = useLiveCodeDataById(id);
        const { navigateToEditLiveCodeTask } = useEditLiveCodeTaskNavigation();

        const onEditEntity = useCallback(() => {
            if (liveCodeData.data) {
                navigateToEditLiveCodeTask(liveCodeData.data.id);
            }
        }, [liveCodeData.data, navigateToEditLiveCodeTask]);

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
                        {t('Редагувати код')}
                    </ButtonDeprecated>
                }
            />
        );
    },
);

import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface TriggerProps {
    onClick: () => void;
}

export const Trigger = memo(({ onClick }: TriggerProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<Icon Svg={NotificationIcon} clickable onClick={onClick} />}
            off={
                <ButtonDeprecated onClick={onClick} theme={ButtonTheme.CLEAR}>
                    <IconDeprecated Svg={NotificationIconDeprecated} inverted />
                </ButtonDeprecated>
            }
        />
    );
});

import React, { memo } from 'react';
import { ConfirmCancelContentDeprecated } from './ConfirmCancelContentDeprecated/ConfirmCancelContentDeprecated';
import { ConfirmCancelContentRedesigned } from './ConfirmCancelContentRedesigned/ConfirmCancelContentRedesigned';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export interface ConfirmCancelContentProps {
    onCancel: () => void;
    onConfirm: () => void;
    text: string;
    cancelBtnText: string;
    confirmBtnText: string;
}

const ConfirmCancelContent = memo((props: ConfirmCancelContentProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ConfirmCancelContentRedesigned {...props} />}
            off={<ConfirmCancelContentDeprecated {...props} />}
        />
    );
});

export default ConfirmCancelContent;

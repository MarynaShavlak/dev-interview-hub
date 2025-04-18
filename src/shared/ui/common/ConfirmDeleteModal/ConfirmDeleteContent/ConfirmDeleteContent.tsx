import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ConfirmDeleteContentRedesigned } from './ConfirmDeleteContentRedesigned/ConfirmDeleteContentRedesigned';
import { ConfirmDeleteContentDeprecated } from './ConfirmDeleteContentDeprecated/ConfirmDeleteContentDeprecated';

export interface ConfirmDeleteContentProps {
    onCancel: () => void;
    onConfirm: () => Promise<void>;
    text: string;
}

const ConfirmDeleteContent = memo((props: ConfirmDeleteContentProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ConfirmDeleteContentRedesigned {...props} />}
            off={<ConfirmDeleteContentDeprecated {...props} />}
        />
    );
});

export default ConfirmDeleteContent;

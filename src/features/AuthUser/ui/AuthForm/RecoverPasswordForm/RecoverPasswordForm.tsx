import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { RecoverPasswordFormRedesigned } from './RecoverPasswordFormRedesigned/RecoverPasswordFormRedesigned';
import { RecoverPasswordFormDeprecated } from './RecoverPasswordFormDeprecated/RecoverPasswordFormDeprecated';

export interface RecoverPasswordFormProps {
    toggleForm: () => void;
}

export const RecoverPasswordForm = memo((props: RecoverPasswordFormProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RecoverPasswordFormRedesigned {...props} />}
            off={<RecoverPasswordFormDeprecated {...props} />}
        />
    );
});

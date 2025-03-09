import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ValidationErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';
import { InputErrorValidation } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { PasswordInputRedesigned } from './PasswordInputRedesigned/PasswordInputRedesigned';
import { PasswordInputDeprecated } from './PasswordInputDeprecated/PasswordInputDeprecated';

interface PasswordInputProps {
    password: string;
    onChangePassword: (value: string) => void;
    passwordErrors?: ValidationErrors;
    validConfig?: InputErrorValidation;
    withResetOption?: boolean;
    onShowResetForm?: () => void;
}

export const PasswordInput = memo((props: PasswordInputProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<PasswordInputRedesigned {...props} />}
            off={<PasswordInputDeprecated {...props} />}
        />
    );
});

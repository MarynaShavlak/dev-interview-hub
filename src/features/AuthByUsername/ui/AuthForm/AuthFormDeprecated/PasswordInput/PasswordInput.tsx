import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import cls from '../../AuthForm.module.scss';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { useToggleVisibility } from '../../../../lib/hooks/useToggleVisibility/useToggleVisibility';
import { ValidationErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';
import { InputErrorValidation } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import EyeIconRedesigned from '@/shared/assets/icons/eye.svg';
import EyeInvisibleIconRedesigned from '@/shared/assets/icons/eye-slash.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Box } from '@/shared/ui/common/Box';

interface PasswordInputProps {
    password: string;
    onChangePassword: (value: string) => void;
    passwordErrors?: ValidationErrors;
    validConfig?: InputErrorValidation;
    withResetOption?: boolean;
    onShowResetForm?: () => void;
}

export const PasswordInput = memo((props: PasswordInputProps) => {
    const {
        password,
        onChangePassword,
        passwordErrors,
        validConfig,
        withResetOption = false,
        onShowResetForm,
    } = props;
    const { t } = useTranslation('profile');

    const { isVisible, toggleVisibility } = useToggleVisibility();

    const InputElement = (
        <Box className={cls.passwordInputWrapper}>
            <Input
                type={isVisible ? 'text' : 'password'}
                placeholder={t('Введіть пароль')}
                onChange={onChangePassword}
                value={password}
                data-testid="login-password-input"
                // label={t('Пароль')}

                validations={validConfig?.password}
                errors={passwordErrors}
            />
            <Button
                theme={ButtonTheme.LINK}
                className={cls.passwordInputLinkDeprecated}
                onClick={toggleVisibility}
            >
                <Icon
                    Svg={
                        isVisible
                            ? EyeIconRedesigned
                            : EyeInvisibleIconRedesigned
                    }
                />
            </Button>
        </Box>
    );

    return withResetOption ? (
        <VStack className={cls.passwordInputWrapper} max>
            <Button
                theme={ButtonTheme.LINK}
                className={cls.passwordInputLinkDeprecated}
                onClick={onShowResetForm}
            >
                {t('Забули пароль?')}
            </Button>

            {InputElement}
        </VStack>
    ) : (
        InputElement
    );
});

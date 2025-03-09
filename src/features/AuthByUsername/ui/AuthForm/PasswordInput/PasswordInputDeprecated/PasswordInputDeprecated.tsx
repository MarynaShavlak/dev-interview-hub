import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import cls from '../PasswordInput.module.scss';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { useToggleVisibility } from '../../../../lib/hooks/useToggleVisibility/useToggleVisibility';
import { ValidationErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';
import { InputErrorValidation } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import EyeIconRedesigned from '@/shared/assets/icons/eye.svg';
import EyeInvisibleIconRedesigned from '@/shared/assets/icons/eye-slash.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Box } from '@/shared/ui/common/Box';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

interface PasswordInputProps {
    password: string;
    onChangePassword: (value: string) => void;
    passwordErrors?: ValidationErrors;
    validConfig?: InputErrorValidation;
    withResetOption?: boolean;
    onShowResetForm?: () => void;
    label?: string;
}

export const PasswordInputDeprecated = memo((props: PasswordInputProps) => {
    const {
        password,
        onChangePassword,
        passwordErrors,
        validConfig,
        withResetOption = false,
        onShowResetForm,
        label,
    } = props;
    const { t } = useTranslation('profile');

    const { isVisible, toggleVisibility } = useToggleVisibility();
    const wrappClasses = getFlexClasses({ hStack: true });

    const InputElement = (
        <Box className={classNames(cls.passwordInputWrapper, {}, wrappClasses)}>
            <Input
                type={isVisible ? 'text' : 'password'}
                placeholder={label || t('Введіть пароль')}
                onChange={onChangePassword}
                value={password}
                data-testid="login-password-input"
                validations={validConfig?.password}
                errors={passwordErrors}
            />
            <Button theme={ButtonTheme.CLEAR} onClick={toggleVisibility}>
                <Icon
                    width={32}
                    height={32}
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
            {InputElement}
            <Button
                theme={ButtonTheme.LINK}
                className={cls.passwordInputLinkDeprecated}
                onClick={onShowResetForm}
            >
                {t('Забули пароль?')}
            </Button>
        </VStack>
    ) : (
        InputElement
    );
});

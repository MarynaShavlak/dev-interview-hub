import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import cls from '../PasswordInput.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIconRedesigned from '@/shared/assets/icons/eye.svg';
import EyeInvisibleIconRedesigned from '@/shared/assets/icons/eye-slash.svg';
import { PasswordInputProps } from '../PasswordInput';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';

export const PasswordInputRedesigned = memo((props: PasswordInputProps) => {
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
        <Input
            type={isVisible ? 'text' : 'password'}
            placeholder={t('Введіть пароль')}
            onChange={onChangePassword}
            value={password}
            data-testid="login-password-input"
            label={t('Пароль')}
            addonRight={
                <Icon
                    Svg={
                        isVisible
                            ? EyeIconRedesigned
                            : EyeInvisibleIconRedesigned
                    }
                    clickable
                    onClick={toggleVisibility}
                />
            }
            validations={validConfig?.password}
            errors={passwordErrors}
        />
    );

    return withResetOption ? (
        <VStack className={cls.passwordInputWrapper} max>
            <Button
                variant="link"
                className={cls.passwordInputLink}
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

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../../AuthForm.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIconRedesigned from '@/shared/assets/icons/eye.svg';
import EyeInvisibleIconRedesigned from '@/shared/assets/icons/eye-slash.svg';
import { AuthFormProps } from '../../AuthForm';
import { useSignupForm } from '../../../../lib/hooks/useSignupForm/useSignupForm';
import { useAuthValidationConfig } from '../../../../lib/hooks/useAuthValidationConfig/useAuthValidationConfig';
import { useErrorText } from '../../../../lib/hooks/useErrorText/useErrorText';
import { useToggleVisibility } from '../../../../lib/hooks/useToggleVisibility/useToggleVisibility';
import { useAuthFormValidations } from '../../../../lib/hooks/useAuthFormValidations/useAuthFormValidations';

export const SignUpForm = memo((props: AuthFormProps) => {
    const { className, onSuccess } = props;
    const { t } = useTranslation('profile');

    const {
        firstname,
        lastname,
        username,
        email,
        password,
        isLoading,
        error,
        onChangeFirstname,
        onChangeLastname,
        onChangeUsername,
        onChangeEmail,
        onChangePassword,
        onSignupClick,
    } = useSignupForm(onSuccess);

    const validConfig = useAuthValidationConfig();

    const {
        hasErrors,
        passwordErrors,
        lastnameErrors,
        usernameErrors,
        firstnameErrors,
        emailErrors,
    } = useAuthFormValidations(
        { email, password, username, firstname, lastname },
        validConfig,
        'signUp',
    );
    const errorText = useErrorText(error);
    const { isVisible, toggleVisibility } = useToggleVisibility();

    return (
        <VStack
            max
            gap="16"
            className={classNames(cls.AuthForm, {}, [className])}
            data-testid="auth-form-sign-up"
        >
            <Text title={t('Форма реєстрації')} />
            {error && <Text text={errorText} variant="error" />}
            <Input
                type="text"
                placeholder={t("Введіть ваше ім'я")}
                onChange={onChangeFirstname}
                value={firstname}
                data-testid="signup-firstname-input"
                label={t("Ім'я")}
                validations={validConfig.firstname}
                errors={firstnameErrors}
            />
            <Input
                type="text"
                placeholder={t('Введіть Ваше прізвище')}
                onChange={onChangeLastname}
                value={lastname}
                data-testid="signup-lastname-input"
                label={t('Прізвище')}
                validations={validConfig.lastname}
                errors={lastnameErrors}
            />
            <Input
                type="text"
                placeholder={t("Введіть ім'я користувача")}
                onChange={onChangeUsername}
                value={username}
                data-testid="signup-username-input"
                label={t("Ім'я користувача")}
                validations={validConfig.username}
                errors={usernameErrors}
            />
            <Input
                type="text"
                placeholder={t('Введіть email')}
                onChange={onChangeEmail}
                value={email}
                data-testid="signup-email-input"
                label={t('Email')}
                validations={validConfig.email}
                errors={emailErrors}
            />

            <Input
                type={isVisible ? 'text' : 'password'}
                placeholder={t('Введіть пароль')}
                onChange={onChangePassword}
                value={password}
                data-testid="signup--password-input"
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
                validations={validConfig.password}
                errors={passwordErrors}
            />

            <Button
                max
                variant="accent"
                className={cls.authBtn}
                onClick={onSignupClick}
                disabled={isLoading || hasErrors}
                data-testid="login-submit-btn"
            >
                {t('Зареєструватись')}
            </Button>
        </VStack>
    );
});

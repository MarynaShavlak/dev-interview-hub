import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import cls from '../../AuthForm.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { AuthFormProps } from '../../AuthForm';

import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useErrorText } from '../../../../lib/hooks/useErrorText/useErrorText';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useSignUpForm } from '../../../../lib/hooks/useSignUpForm/useSignUpForm';
import { PasswordInput } from '../../PasswordInput/PasswordInput';

export const SignupFormRedesigned = memo((props: AuthFormProps) => {
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
    } = useSignUpForm(onSuccess);

    const validConfig = useInputValidationConfig();

    const {
        hasInputErrors,
        passwordErrors,
        lastnameErrors,
        usernameErrors,
        firstnameErrors,
        emailErrors,
    } = useFormValidation(
        { email, password, username, firstname, lastname },
        validConfig,
        'signUp',
    );
    const errorText = useErrorText(error);

    return (
        <VStack
            max
            gap="16"
            className={className}
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

            <PasswordInput
                password={password}
                onChangePassword={onChangePassword}
                passwordErrors={passwordErrors}
                validConfig={validConfig}
            />

            <Button
                max
                variant="accent"
                className={cls.authBtn}
                onClick={onSignupClick}
                disabled={isLoading || hasInputErrors}
                data-testid="signup-submit-btn"
            >
                {t('Зареєструватись')}
            </Button>
        </VStack>
    );
});

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../../AuthForm.module.scss';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { AuthFormProps } from '../../AuthForm';

import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useErrorText } from '../../../../lib/hooks/useErrorText/useErrorText';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useSignUpForm } from '../../../../lib/hooks/useSignUpForm/useSignUpForm';
import { PasswordInput } from '../PasswordInput/PasswordInput';

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
            className={classNames(cls.AuthForm, {}, [className])}
            data-testid="auth-form-sign-up"
            align="center"
        >
            <Text title={t('Форма реєстрації')} />
            {error && <Text text={errorText} theme={TextTheme.ERROR} />}
            <Input
                type="text"
                placeholder={t("Ім'я")}
                onChange={onChangeFirstname}
                value={firstname}
                data-testid="signup-firstname-input"
                // label={t()}
                validations={validConfig.firstname}
                errors={firstnameErrors}
                maxLengthIndicator
            />
            <Input
                type="text"
                placeholder={t('Прізвище')}
                onChange={onChangeLastname}
                value={lastname}
                data-testid="signup-lastname-input"
                // label={t('Прізвище')}
                validations={validConfig.lastname}
                errors={lastnameErrors}
                maxLengthIndicator
            />
            <Input
                type="text"
                placeholder={t("Ім'я користувача")}
                onChange={onChangeUsername}
                value={username}
                data-testid="signup-username-input"
                // label={t("Ім'я користувача")}
                validations={validConfig.username}
                errors={usernameErrors}
            />
            <Input
                type="text"
                placeholder={t('Email')}
                onChange={onChangeEmail}
                value={email}
                data-testid="signup-email-input"
                // label={t('Email')}
                validations={validConfig.email}
                errors={emailErrors}
            />

            <PasswordInput
                password={password}
                onChangePassword={onChangePassword}
                passwordErrors={passwordErrors}
                validConfig={validConfig}
                label={t('Пароль')}
            />

            <Button
                max
                // variant="accent"
                theme={ButtonTheme.OUTLINE}
                className={cls.authBtn}
                onClick={onSignupClick}
                disabled={isLoading || hasInputErrors}
                data-testid="login-submit-btn"
            >
                {t('Зареєструватись')}
            </Button>
        </VStack>
    );
});

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import cls from '../../AuthForm.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

import { AuthFormProps } from '../../AuthForm';
import { useSignInForm } from '../../../../lib/hooks/useSignInForm/useSignInForm';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useToggleForm } from '../../../../lib/hooks/useToggleForm/useToggleForm';
import { RecoverPasswordForm } from '../RecoverPasswordForm/RecoverPasswordForm';
import { PasswordInput } from '../../PasswordInput/PasswordInput';

export const SignInForm = memo((props: AuthFormProps) => {
    const { className, onSuccess } = props;
    const { t } = useTranslation('profile');
    const {
        email,
        password,
        isLoading,
        error,
        onChangeEmail,
        onChangePassword,
        onLoginClick,
    } = useSignInForm(onSuccess);

    const validConfig = useInputValidationConfig();

    const { hasInputErrors, passwordErrors, emailErrors } = useFormValidation(
        { email, password },
        validConfig,
        'signIn',
    );

    const { isLoginFormOpen, toggleForm } = useToggleForm();

    return (
        <VStack
            max
            gap="16"
            className={className}
            data-testid="auth-form-sign-in"
            align="center"
        >
            {!isLoginFormOpen ? (
                <RecoverPasswordForm toggleForm={toggleForm} />
            ) : (
                <>
                    <Text title={t('Форма авторизації')} />
                    {error && (
                        <Text
                            text={t('Ви ввели невірний логін або пароль')}
                            variant="error"
                        />
                    )}
                    <Input
                        type="text"
                        placeholder={t('Введіть email')}
                        onChange={onChangeEmail}
                        value={email}
                        data-testid="login-email-input"
                        label={t('Email')}
                        validations={validConfig.email}
                        errors={emailErrors}
                    />
                    <VStack className={cls.passwordInputWrapper} max>
                        {/* <Button */}
                        {/*    variant="link" */}
                        {/*    className={cls.passwordInputLink} */}
                        {/*    onClick={toggleForm} */}
                        {/* > */}
                        {/*    {t('Забули пароль?')} */}
                        {/* </Button> */}
                        <PasswordInput
                            password={password}
                            onChangePassword={onChangePassword}
                            // passwordErrors={passwordErrors}
                            // validConfig={validConfig}
                            withResetOption
                            onShowResetForm={toggleForm}
                        />
                    </VStack>

                    <Button
                        max
                        variant="accent"
                        className={cls.authBtn}
                        onClick={onLoginClick}
                        disabled={isLoading || hasInputErrors}
                        data-testid="login-submit-btn"
                    >
                        {t('Увійти')}
                    </Button>
                </>
            )}
        </VStack>
    );
});

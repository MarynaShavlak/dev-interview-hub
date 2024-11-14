import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../../AuthForm.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIconRedesigned from '@/shared/assets/icons/eye.svg';
import { useLoginForm } from '../../../../lib/hooks/useLoginForm/useLoginForm';
import { AuthFormProps } from '../../AuthForm';
import { useValidation } from '@/shared/lib/hooks/useValidation/useValidation';

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
    } = useLoginForm(onSuccess);

    const memoizedEmailValidations = useMemo(
        () => ({
            isEmpty: true,
            isEmail: true,
        }),
        [],
    );

    const memoizedPasswordValidations = useMemo(
        () => ({
            isEmpty: true,
            minLength: 3,
            maxLength: 8,
        }),
        [],
    );

    const emailValidation = useValidation(email, memoizedEmailValidations);
    const passwordValidation = useValidation(
        password,
        memoizedPasswordValidations,
    );

    const hasErrors =
        Object.values(emailValidation).some((error) => error) ||
        Object.values(passwordValidation).some((error) => error);

    return (
        <VStack
            gap="16"
            className={classNames(cls.AuthForm, {}, [className])}
            data-testid="auth-form-sign-in"
        >
            <Text title={t('Форма авторизації')} />
            {error && (
                <Text
                    text={t('Ви ввели невірний логін або пароль')}
                    variant="error"
                />
            )}
            <Input
                autofocus
                type="text"
                placeholder={t('Введіть email')}
                onChange={onChangeEmail}
                value={email}
                data-testid="login-email-input"
                label={t('Email')}
                validations={memoizedEmailValidations}
                errors={emailValidation}
            />
            <VStack className={cls.passwordInputWrapper} max>
                <Button variant="link" className={cls.passwordInputLink}>
                    {t('Забули пароль?')}
                </Button>

                <Input
                    type="text"
                    placeholder={t('Введіть пароль')}
                    onChange={onChangePassword}
                    value={password}
                    data-testid="login-password-input"
                    label={t('Пароль')}
                    addonRight={
                        <Icon
                            Svg={EyeIconRedesigned}
                            clickable
                            onClick={(e: any) => console.log(e.target)}
                        />
                    }
                    validations={memoizedPasswordValidations}
                    errors={passwordValidation}
                />
            </VStack>

            <Button
                max
                variant="accent"
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading || hasErrors}
                data-testid="login-submit-btn"
            >
                {t('Увійти')}
            </Button>
        </VStack>
    );
});

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
import { AuthFormProps } from '../../AuthForm';
import { useSignupForm } from '../../../../lib/hooks/useSignupForm/useSignupForm';

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
    return (
        <VStack
            gap="16"
            className={classNames(cls.AuthForm, {}, [className])}
            data-testid="auth-form-sign-up"
        >
            <Text title={t('Форма реєстрації')} />
            {/* {error && ( */}
            {/*    <Text */}
            {/*        text={t('Ви ввели невірний логін або пароль')} */}
            {/*        variant="error" */}
            {/*    /> */}
            {/* )} */}
            <Input
                autofocus
                type="text"
                placeholder={t("Введіть ваше ім'я")}
                onChange={onChangeUsername}
                value={username}
                data-testid="signup-firstname-input"
                label={t("Ім'я")}
                validations={memoizedUsernameValidations}
                errors={usernameValidation}
            />
            <Input
                type="text"
                placeholder={t('Введіть Ваше прізвище')}
                onChange={onChangeUsername}
                value={username}
                data-testid="signup-lastname-input"
                label={t('Прізвище')}
                validations={memoizedUsernameValidations}
                errors={usernameValidation}
            />
            <Input
                type="text"
                placeholder={t("Введіть ім'я користувача")}
                onChange={onChangeUsername}
                value={username}
                data-testid="signup-username-input"
                label={t("Ім'я користувача")}
                validations={memoizedUsernameValidations}
                errors={usernameValidation}
            />
            <Input
                type="text"
                placeholder={t('Введіть email')}
                onChange={onChangeUsername}
                value={username}
                data-testid="signup-email-input"
                label={t('Email')}
                validations={memoizedUsernameValidations}
                errors={usernameValidation}
            />

            <Input
                type="text"
                placeholder={t('Введіть пароль')}
                onChange={onChangePassword}
                value={password}
                data-testid="signup--password-input"
                label={t('Пароль')}
                addonRight={
                    <Icon
                        Svg={EyeIconRedesigned}
                        clickable
                        onClick={(e: any) => console.log(e.target)}
                    />
                }
            />

            <Button
                max
                variant="accent"
                className={cls.loginBtn}
                onClick={onSignupClick}
                disabled={isLoading || hasErrors}
                data-testid="login-submit-btn"
            >
                {buttonText}
            </Button>
        </VStack>
    );
});

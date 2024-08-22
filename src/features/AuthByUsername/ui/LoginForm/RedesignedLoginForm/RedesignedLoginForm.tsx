import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useLoginForm } from '../../../lib/hooks/useLoginForm';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from '../LoginForm.module.scss';
import { LoginFormProps } from '../LoginForm';

export const RedesignedLoginForm = memo(
    ({ className, onSuccess }: LoginFormProps) => {
        const { t } = useTranslation();
        const {
            username,
            password,
            isLoading,
            error,
            onChangeUsername,
            onChangePassword,
            onLoginClick,
        } = useLoginForm(onSuccess);

        return (
            <VStack
                gap="16"
                className={classNames(cls.LoginForm, {}, [className])}
                data-testid="login-form"
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
                    placeholder={t("Введіть ім'я користувача")}
                    onChange={onChangeUsername}
                    value={username}
                    data-testid="login-username-input"
                />
                <Input
                    type="text"
                    placeholder={t('Введіть пароль')}
                    onChange={onChangePassword}
                    value={password}
                    data-testid="login-password-input"
                />
                <Button
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                    data-testid="login-submit-btn"
                >
                    {t('Вхід')}
                </Button>
            </VStack>
        );
    },
);

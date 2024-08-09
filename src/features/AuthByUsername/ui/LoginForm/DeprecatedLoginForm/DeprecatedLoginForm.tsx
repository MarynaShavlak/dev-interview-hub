import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useLoginForm } from '../../../lib/hooks/useLoginForm';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Input } from '@/shared/ui/deprecated/Input';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import cls from '../LoginForm.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { LoginFormProps } from '../LoginForm';

export const DeprecatedLoginForm = memo(
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
            >
                <Text title={t('Форма авторизації')} />
                {error && (
                    <Text
                        text={t('Ви ввели невірний логін або пароль')}
                        theme={TextTheme.ERROR}
                    />
                )}
                <Input
                    autofocus
                    type="text"
                    placeholder={t("Введіть ім'я користувача")}
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    type="text"
                    placeholder={t('Введіть пароль')}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Вхід')}
                </Button>
            </VStack>
        );
    },
);

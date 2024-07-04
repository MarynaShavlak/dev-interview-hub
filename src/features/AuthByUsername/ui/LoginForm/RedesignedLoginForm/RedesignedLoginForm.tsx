import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useLoginForm } from '../../../lib/hooks/useLoginForm';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from '../LoginForm.module.scss';

interface RedesignedLoginFormProps {
    className?: string;
    onSuccess: () => void;
}

export const RedesignedLoginForm = memo(
    ({ className, onSuccess }: RedesignedLoginFormProps) => {
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
                        variant="error"
                    />
                )}
                <Input
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder={t("Введіть ім'я користувача")}
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    type="text"
                    className={cls.input}
                    placeholder={t('Введіть пароль')}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
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

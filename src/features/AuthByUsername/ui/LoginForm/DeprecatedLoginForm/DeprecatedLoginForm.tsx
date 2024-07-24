import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useLoginForm } from '../../../lib/hooks/useLoginForm';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Input } from '@/shared/ui/deprecated/Input';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import cls from '../LoginForm.module.scss';

interface DeprecatedLoginFormProps {
    className?: string;
    onSuccess: () => void;
}

export const DeprecatedLoginForm = memo(
    ({ className, onSuccess }: DeprecatedLoginFormProps) => {
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
            <div className={classNames(cls.LoginForm, {}, [className])}>
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
                    theme={ButtonTheme.OUTLINE}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Вхід')}
                </Button>
            </div>
        );
    },
);

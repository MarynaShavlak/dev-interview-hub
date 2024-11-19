import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from '../../AuthForm.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

import { useLoginForm } from '../../../../lib/hooks/useLoginForm/useLoginForm';
import { useAuthValidationConfig } from '../../../../lib/hooks/useAuthValidationConfig/useAuthValidationConfig';
import { useAuthFormValidations } from '../../../../lib/hooks/useAuthFormValidations/useAuthFormValidations';

interface RecoverPasswordFormProps {
    toggleForm: () => void;
}

export const RecoverPasswordForm = memo(
    ({ toggleForm }: RecoverPasswordFormProps) => {
        const { t } = useTranslation('profile');
        const { email, isLoading, error, onChangeEmail, onResetPasswordClick } =
            useLoginForm();

        const redirectLinkText = t("Я пам'ятаю пароль");

        const validConfig = useAuthValidationConfig();

        const { hasErrors, emailErrors } = useAuthFormValidations(
            { email },
            validConfig,
            'resetPassword',
        );

        return (
            <>
                <Text title={t('Відновлення паролю')} />
                <Text text={t('Вкажіть адресу')} />
                {error && (
                    <Text
                        text={t('Помилка відновлення паролю')}
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

                <Button
                    max
                    variant="accent"
                    className={cls.authBtn}
                    onClick={onResetPasswordClick}
                    disabled={isLoading || hasErrors}
                    data-testid="reset-password-btn"
                >
                    {t('Скинути пароль')}
                </Button>

                <Button variant="link" onClick={toggleForm}>
                    {redirectLinkText}
                </Button>
            </>
        );
    },
);

import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';

import { useSignInForm } from '../../../../lib/hooks/useSignInForm/useSignInForm';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { Input } from '@/shared/ui/redesigned/Input';
import cls from '../../AuthForm.module.scss';

interface RecoverPasswordFormProps {
    toggleForm: () => void;
}

export const RecoverPasswordForm = memo(
    ({ toggleForm }: RecoverPasswordFormProps) => {
        const { t } = useTranslation('profile');
        const [isEmailSent, setIsEmailSent] = useState(false);
        const toggleContent = useCallback(() => {
            setIsEmailSent(true);
        }, []);

        const { email, isLoading, error, onChangeEmail, onResetPasswordClick } =
            useSignInForm(toggleContent);

        const redirectLinkText = t("Я пам'ятаю пароль");

        const validConfig = useInputValidationConfig();

        const { hasErrors, emailErrors } = useFormValidation(
            { email },
            validConfig,
            'resetPassword',
        );

        return (
            <>
                <Text title={t('Відновлення паролю')} />
                {error && (
                    <Text
                        text={t('Помилка відновлення паролю')}
                        variant="error"
                    />
                )}
                {isEmailSent ? (
                    <Text
                        text={t('Лист {{email}} відновлення паролю', { email })}
                    />
                ) : (
                    <>
                        <Text text={t('Вкажіть адресу')} />

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
                    </>
                )}

                <Button variant="link" onClick={toggleForm}>
                    {redirectLinkText}
                </Button>
            </>
        );
    },
);

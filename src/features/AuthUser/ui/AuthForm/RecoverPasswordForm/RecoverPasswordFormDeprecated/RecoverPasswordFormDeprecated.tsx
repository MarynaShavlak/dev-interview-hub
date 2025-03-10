import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { useSignInForm } from '../../../../lib/hooks/useSignInForm/useSignInForm';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { Input } from '@/shared/ui/deprecated/Input';
import cls from '../ RecoverPasswordForm.module.scss';
import { RecoverPasswordFormProps } from '../RecoverPasswordForm';
import { VStack } from '@/shared/ui/common/Stack';

export const RecoverPasswordFormDeprecated = memo(
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

        const { hasInputErrors, emailErrors } = useFormValidation(
            { email },
            validConfig,
            'resetPassword',
        );

        return (
            <VStack max gap="16" align="center">
                <Text title={t('Відновлення паролю')} />
                {error && (
                    <Text
                        text={t('Помилка відновлення паролю')}
                        theme={TextTheme.ERROR}
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
                            validations={validConfig.email}
                            errors={emailErrors}
                        />

                        <Button
                            max
                            theme={ButtonTheme.OUTLINE}
                            className={cls.resetBtn}
                            onClick={onResetPasswordClick}
                            disabled={isLoading || hasInputErrors}
                            data-testid="reset-password-btn"
                        >
                            {t('Скинути пароль')}
                        </Button>
                    </>
                )}

                <Button
                    theme={ButtonTheme.LINK}
                    className={cls.linkDeprecated}
                    onClick={toggleForm}
                >
                    {redirectLinkText}
                </Button>
            </VStack>
        );
    },
);

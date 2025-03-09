import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { AuthFormProps } from '../AuthForm';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../AuthForm.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import GoogleIcon from '@/shared/assets/icons/google.svg';
import { useToggleForm } from '../../../lib/hooks/useToggleForm/useToggleForm';
import { useSignUpForm } from '../../../lib/hooks/useSignUpForm/useSignUpForm';
import { SignupForm } from '../SignupForm/SignupForm';
import { SigninForm } from '../SigninForm/SigninForm';

export const AuthFormRedesigned = memo((props: AuthFormProps) => {
    const { t } = useTranslation('profile');
    const { onAuthByGoogleClick } = useSignUpForm(props.onSuccess);
    const { isLoginFormOpen, toggleForm } = useToggleForm();
    const buttonGoogleText = t('Продовжити через Google');
    const redirectText = isLoginFormOpen
        ? t('Немає облікового запису?')
        : t('Вже маєш акаунт?');

    const redirectLinkText = isLoginFormOpen
        ? t('Зареєструйтесь')
        : t('Увійти');

    return (
        <VStack gap="16" className={cls.AuthForm}>
            {isLoginFormOpen ? (
                <SigninForm {...props} />
            ) : (
                <SignupForm {...props} />
            )}
            <HStack
                className={cls.formDivider}
                align="center"
                justify="center"
                max
            >
                <Text text={t('або')} />
            </HStack>
            <Button
                max
                variant="outline"
                addonLeft={<Icon Svg={GoogleIcon} width="25" height="25" />}
                className={cls.authBtn}
                onClick={onAuthByGoogleClick}
                data-testid="login-submit-btn"
            >
                {buttonGoogleText}
            </Button>
            <HStack
                justify="center"
                className={cls.formRedirectWrapper}
                gap="8"
            >
                <Text text={redirectText} />
                <Button variant="link" onClick={toggleForm}>
                    {redirectLinkText}
                </Button>
            </HStack>
        </VStack>
    );
});

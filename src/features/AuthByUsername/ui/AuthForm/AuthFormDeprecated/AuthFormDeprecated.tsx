import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { AuthFormProps } from '../AuthForm';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../AuthForm.module.scss';
import { Text } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import GoogleIcon from '@/shared/assets/icons/google.svg';
import { useToggleForm } from '../../../lib/hooks/useToggleForm/useToggleForm';
import { useSignUpForm } from '../../../lib/hooks/useSignUpForm/useSignUpForm';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { SignupForm } from '../SignupForm/SignupForm';
import { SigninForm } from '../SigninForm/SigninForm';

export const AuthFormDeprecated = memo((props: AuthFormProps) => {
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

    const btnClasses = getFlexClasses({
        hStack: true,
        gap: '8',
        justify: 'center',
        align: 'center',
    });
    return (
        <VStack gap="16" className={cls.AuthForm}>
            {isLoginFormOpen ? (
                <SigninForm {...props} />
            ) : (
                <SignupForm {...props} />
            )}
            <HStack
                className={cls.formDividerDeprecated}
                align="center"
                justify="center"
                max
            >
                <Text text={t('або')} />
            </HStack>
            <Button
                max
                className={classNames(cls.authBtn, {}, btnClasses)}
                onClick={onAuthByGoogleClick}
                data-testid="login-submit-btn"
            >
                <Icon Svg={GoogleIcon} width="25" height="25" />
                {buttonGoogleText}
            </Button>
            <HStack
                justify="center"
                className={cls.formRedirectWrapper}
                gap="8"
            >
                <Text text={redirectText} />
                <Button onClick={toggleForm}>{redirectLinkText}</Button>
            </HStack>
        </VStack>
    );
});

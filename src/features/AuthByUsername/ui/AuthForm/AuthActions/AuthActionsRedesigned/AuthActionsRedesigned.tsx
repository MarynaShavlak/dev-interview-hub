import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../AuthActions.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import GoogleIcon from '@/shared/assets/icons/google.svg';
import { useSignUpForm } from '../../../../lib/hooks/useSignUpForm/useSignUpForm';
import { AuthActionsProps } from '../AuthActions';

export const AuthActionsRedesigned = memo((props: AuthActionsProps) => {
    const { onToggleForm, onSuccess, isLoginFormOpen } = props;
    const { t } = useTranslation('profile');
    const { onAuthByGoogleClick } = useSignUpForm(onSuccess);

    const buttonGoogleText = t('Продовжити через Google');
    const redirectText = isLoginFormOpen
        ? t('Немає облікового запису?')
        : t('Вже маєш акаунт?');

    const redirectLinkText = isLoginFormOpen
        ? t('Зареєструйтесь')
        : t('Увійти');

    return (
        <VStack gap="16" className={cls.AuthForm}>
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
                <Button variant="link" onClick={onToggleForm}>
                    {redirectLinkText}
                </Button>
            </HStack>
        </VStack>
    );
});

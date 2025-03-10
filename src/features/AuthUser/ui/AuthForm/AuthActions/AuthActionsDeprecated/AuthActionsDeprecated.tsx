import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../AuthActions.module.scss';
import { Text } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import GoogleIcon from '@/shared/assets/icons/google.svg';
import { useSignUpForm } from '../../../../lib/hooks/useSignUpForm/useSignUpForm';
import { AuthActionsProps } from '../AuthActions';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

export const AuthActionsDeprecated = memo((props: AuthActionsProps) => {
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

    const btnClasses = getFlexClasses({
        hStack: true,
        gap: '8',
        justify: 'center',
        align: 'center',
    });

    return (
        <VStack gap="16" max>
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
                <Button onClick={onToggleForm}>{redirectLinkText}</Button>
            </HStack>
        </VStack>
    );
});

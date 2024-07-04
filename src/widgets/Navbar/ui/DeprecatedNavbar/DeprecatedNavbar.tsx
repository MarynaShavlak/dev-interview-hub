import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { useAuthModal } from '../../lib/hooks/useAuthModal';
import { LoginModal } from '@/features/AuthByUsername';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';
import cls from '../Navbar.module.scss';
import { getRouteArticleCreate } from '@/shared/const/router';

interface NavbarProps {
    className?: string;
}

export const AuthorizedDeprecatedNavbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Text
                className={cls.appName}
                title={t('PROD TEMPLATE APP')}
                theme={TextTheme.INVERTED}
            />
            <AppLink
                to={getRouteArticleCreate()}
                theme={AppLinkTheme.SECONDARY}
                className={cls.createBtn}
            >
                {t('Додати статтю')}
            </AppLink>
            <HStack gap="16" className={cls.actions}>
                <NotificationButton />
                <AvatarDropdown />
            </HStack>
        </header>
    );
});

export const NotAuthorizedDeprecatedNavbar = memo(
    ({ className }: NavbarProps) => {
        const { t } = useTranslation();
        const { isAuthModal, onShowModal, onCloseModal } = useAuthModal();

        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    className={cls.links}
                    onClick={onShowModal}
                >
                    {t('Вхід')}
                </Button>
                {isAuthModal && (
                    <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
                )}
            </header>
        );
    },
);

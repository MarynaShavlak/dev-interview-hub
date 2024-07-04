import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthModal } from '../../lib/hooks/useAuthModal';
import { LoginModal } from '@/features/AuthByUsername';
import { Button } from '@/shared/ui/redesigned/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';
import cls from '../Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const AuthorizedRedesignedNavbar = memo(({ className }: NavbarProps) => {
    return (
        <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
            <HStack gap="16" className={cls.actions}>
                <NotificationButton />
                <AvatarDropdown />
            </HStack>
        </header>
    );
});

export const NotAuthorizedRedesignedNavbar = memo(
    ({ className }: NavbarProps) => {
        const { isAuthModal, onShowModal, onCloseModal } = useAuthModal();
        const { t } = useTranslation();
        return (
            <header
                className={classNames(cls.NavbarRedesigned, {}, [className])}
            >
                <Button
                    variant="clear"
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

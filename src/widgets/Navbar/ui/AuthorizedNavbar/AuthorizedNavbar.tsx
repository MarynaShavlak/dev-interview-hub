import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../Navbar.module.scss';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { getRouteArticleCreate } from '@/shared/const/router/router';
import { HStack } from '@/shared/ui/common/Stack';
import { NotificationButton } from '@/features/NButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';

interface NavbarProps {
    className?: string;
}

const AuthorizedDeprecatedNavbar = memo(({ className }: NavbarProps) => {
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

const AuthorizedRedesignedNavbar = memo(({ className }: NavbarProps) => {
    return (
        <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
            <HStack gap="8" className={cls.actions}>
                <NotificationButton />
                <AvatarDropdown />
            </HStack>
        </header>
    );
});

export const AuthorizedNavbar = memo(({ className }: NavbarProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<AuthorizedRedesignedNavbar className={className} />}
            off={<AuthorizedDeprecatedNavbar className={className} />}
        />
    );
});

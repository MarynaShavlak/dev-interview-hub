import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../Navbar.module.scss';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import {
    getRouteArticleCreate,
    getRouteHRInterviewQACreate,
} from '@/shared/const/router/router';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { AppLogo } from '@/shared/ui/common/AppLogo';
import {
    Text as TextDeprecated,
    TextAlign,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';

interface NavbarProps {
    className?: string;
}

const AuthorizedDeprecatedNavbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <VStack
                align="center"
                className={cls.logoWrapper}
                gap="4"
                justify="start"
            >
                <AppLogo size={40} />
                <TextDeprecated
                    className={cls.appName}
                    title={t('DEV INTERVIEW HUB')}
                    theme={TextTheme.INVERTED}
                    align={TextAlign.CENTER}
                    size={TextSize.S}
                />
            </VStack>
            <HStack gap="40">
                <AppLink
                    to={getRouteArticleCreate()}
                    theme={AppLinkTheme.SECONDARY}
                    className={cls.createBtn}
                >
                    {t('Додати статтю')}
                </AppLink>
                <AppLink
                    to={getRouteHRInterviewQACreate()}
                    theme={AppLinkTheme.SECONDARY}
                    className={cls.createBtn}
                >
                    {t('Додати нове HR питання')}
                </AppLink>
            </HStack>

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

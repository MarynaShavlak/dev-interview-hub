import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    getRouteAdmin,
    getRouteProfile,
    getRouteSettings,
} from '@/shared/const/router/router';
import {
    isUserAdmin,
    isUserManager,
    useUserAuthData,
    logoutUser,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const authData = useUserAuthData();

    const onLogout = useCallback(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) {
        return null;
    }
    const items = [
        ...(isAdminPanelAvailable
            ? [
                  {
                      content: t('Адмін панель'),
                      href: getRouteAdmin(),
                  },
              ]
            : []),
        {
            content: t('Профіль'),
            href: getRouteProfile(authData.id),
        },
        {
            content: t('Налаштування'),
            href: getRouteSettings(),
        },
        {
            content: t('Вийти'),
            onClick: onLogout,
        },
    ];

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Dropdown
                    direction="bottom left"
                    items={items}
                    trigger={<Avatar size={40} src={authData.avatar} />}
                />
            }
            off={
                <DropdownDeprecated
                    direction="bottom left"
                    items={items}
                    trigger={
                        <AvatarDeprecated
                            fallbackInverted
                            size={30}
                            src={authData.avatar}
                        />
                    }
                />
            }
        />
    );
});

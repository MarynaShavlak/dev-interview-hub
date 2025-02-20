import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
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
import { logoutUser, useGetUserRoles, useUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AvatarDropdown.module.scss';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { isAdmin, isManager } = useGetUserRoles();
    const authData = useUserAuthData();

    const onLogout = useCallback(async () => {
        try {
            await dispatch(logoutUser());
        } catch (err) {
            console.error('Error during logout:', err);
        }
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) {
        return null;
    }
    const items = [
        ...(isAdminPanelAvailable
            ? [
                  {
                      label: t('Адмін панель'),
                      href: getRouteAdmin(),
                  },
              ]
            : []),
        {
            label: t('Профіль'),
            href: getRouteProfile(authData.id),
        },
        {
            label: t('Налаштування'),
            href: getRouteSettings(),
        },
        {
            label: t('Вийти'),
            onClick: onLogout,
        },
    ];

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Dropdown
                    className={className}
                    direction="bottom left"
                    items={items}
                    trigger={<Avatar size={40} src={authData.avatar} />}
                />
            }
            off={
                <DropdownDeprecated
                    className={cls.AvatarDropdown}
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

import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Dropdown } from '@/shared/ui/deprecated/Popups';
import {
    isUserAdmin,
    isUserManager,
    useUserActions,
    useUserAuthData,
} from '@/entities/User';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
    const { t } = useTranslation();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const authData = useUserAuthData();
    const { logout } = useUserActions();

    const onLogout = useCallback(() => {
        logout();
    }, [logout]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) {
        return null;
    }

    return (
        <Dropdown
            direction="bottom left"
            items={[
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
                    content: t('Вийти'),
                    onClick: onLogout,
                },
            ]}
            trigger={
                <Avatar fallbackInverted size={30} src={authData.avatar} />
            }
        />
    );
});

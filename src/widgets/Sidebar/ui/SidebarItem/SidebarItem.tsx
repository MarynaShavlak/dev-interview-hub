import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import {
    AppLink as AppLinkDeprecated,
    AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { useUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed?: boolean;
    onClick?: () => void;
}

const SidebarItemDeprecated = ({
    item,
    collapsed,
    onClick,
}: SidebarItemProps) => {
    const { t } = useTranslation();

    return (
        <AppLinkDeprecated
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(cls.item, {
                [cls.collapsed]: collapsed,
            })}
            onClick={onClick}
        >
            <IconDeprecated
                Svg={item.Icon}
                className={cls.icon}
                width={24}
                height={24}
            />

            <span className={cls.link}>{t(item.text)}</span>
        </AppLinkDeprecated>
    );
};

const SidebarItemRedesigned = ({
    item,
    collapsed,
    onClick,
}: SidebarItemProps) => {
    const { t } = useTranslation();

    return (
        <AppLink
            to={item.path}
            className={classNames(cls.itemRedesigned, {
                [cls.collapsedRedesigned]: collapsed,
            })}
            activeClassName={cls.active}
            target={item.target}
            onClick={onClick}
        >
            <Icon Svg={item.Icon} />
            <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
    );
};

export const SidebarItem = memo(
    ({ item, collapsed, onClick }: SidebarItemProps) => {
        const isAuth = useUserAuthData();

        if (item.authOnly && !isAuth) {
            return null;
        }
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <SidebarItemRedesigned
                        item={item}
                        collapsed={collapsed}
                        onClick={onClick}
                    />
                }
                off={
                    <SidebarItemDeprecated
                        item={item}
                        collapsed={collapsed}
                        onClick={onClick}
                    />
                }
            />
        );
    },
);

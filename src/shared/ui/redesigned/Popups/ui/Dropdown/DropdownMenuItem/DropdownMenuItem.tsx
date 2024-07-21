import { Menu } from '@headlessui/react';
import { Fragment, memo, ReactNode } from 'react';
import { AppLink } from '../../../../AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from '../Dropdown.module.scss';
import popupCls from '../../../styles/popup.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownMenuItemProps {
    item: DropdownItem;
}

interface ContentProps {
    active: boolean;
}

export const DropdownMenuItem = memo(({ item }: DropdownMenuItemProps) => {
    const content = ({ active }: ContentProps) => (
        <button
            type="button"
            disabled={item.disabled}
            onClick={item.onClick}
            className={classNames(cls.item, {
                [popupCls.active]: active,
            })}
        >
            {item.content}
        </button>
    );

    if (item.href) {
        return (
            <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
            </Menu.Item>
        );
    }

    return (
        <Menu.Item as={Fragment} disabled={item.disabled}>
            {content}
        </Menu.Item>
    );
});

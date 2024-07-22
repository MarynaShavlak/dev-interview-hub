import { Menu } from '@headlessui/react';
import { ReactNode } from 'react';
import { DropdownItem, DropdownOption } from './DropdownItem/DropdownItem';
import { Each } from '@/shared/lib/components/Each/Each';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import cls from './Dropdown.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

interface DropdownProps {
    items: DropdownOption[];
    trigger: ReactNode;
    direction?: DropdownDirection;
    className?: string;
}

export const Dropdown = (props: DropdownProps) => {
    const { className, trigger, items, direction = 'bottom right' } = props;

    const menuClasses = [mapDirectionClass[direction], popupCls.menuRedesigned];

    return (
        <Menu
            as="div"
            className={classNames(cls.Dropdown, {}, [
                className,
                popupCls.popup,
            ])}
        >
            <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                <Each
                    of={items}
                    render={(item, index) => (
                        <DropdownItem
                            key={`dropdown-key-${index}`}
                            item={item}
                        />
                    )}
                />
            </Menu.Items>
        </Menu>
    );
};

import { Menu } from '@headlessui/react';
import { ReactNode } from 'react';
import { Each } from '@/shared/lib/components/Each/Each';
import { DropdownMenuItem } from './DropdownMenuItem/DropdownMenuItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import cls from './Dropdown.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    direction?: DropdownDirection;
    trigger: ReactNode;
}

export function Dropdown(props: DropdownProps) {
    const { className, trigger, items, direction = 'bottom right' } = props;

    const menuClasses = [mapDirectionClass[direction], popupCls.menu];

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
                        <DropdownMenuItem
                            key={`dropdown-key-${index}`}
                            item={item}
                        />
                    )}
                />
            </Menu.Items>
        </Menu>
    );
}

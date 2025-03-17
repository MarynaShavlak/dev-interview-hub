import { Menu } from '@headlessui/react';
import { ReactNode } from 'react';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import cls from './Dropdown.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import { DropdownItem, DropdownOption } from './DropdownItem/DropdownItem';

interface DropdownProps {
    className?: string;
    items: DropdownOption[];
    direction?: DropdownDirection;
    trigger: ReactNode;
}

/**
 * Deprecated, use new component from directory redesigned
 * @deprecated
 */

export function Dropdown(props: DropdownProps) {
    const { className, trigger, items, direction = 'bottom right' } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu
            as="div"
            className={classNames(cls.Dropdown, {}, [
                className,
                popupCls.popup,
            ])}
        >
            <Menu.Button
                className={popupCls.trigger}
                data-testid="drowpdown-trigger"
            >
                {trigger}
            </Menu.Button>
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
}

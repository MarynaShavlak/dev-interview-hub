import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import cls from './Popover.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { TestProps } from '@/shared/types/tests';

interface PopoverProps extends TestProps {
    className?: string;
    direction?: DropdownDirection;
    trigger: ReactNode;
    children: ReactNode;
    noPadding?: boolean;
}
/**
 * Deprecated, use new component from directory redesigned
 * @deprecated
 */
export function Popover(props: PopoverProps) {
    const {
        className,
        trigger,
        direction = 'bottom right',
        children,
        'data-testid': dataTestId,
        noPadding = false,
    } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <HPopover
            className={classNames(cls.Popover, {}, [className, popupCls.popup])}
            data-testid={dataTestId}
        >
            <HPopover.Button className={popupCls.trigger} as="div">
                {trigger}
            </HPopover.Button>

            <HPopover.Panel
                className={classNames(
                    cls.panel,
                    { [cls.noPadding]: noPadding },
                    menuClasses,
                )}
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    );
}

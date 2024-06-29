import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { Icon } from '../../../../Icon';
import { HStack } from '../../../../Stack';
import CheckedIcon from '@/shared/assets/icons/done-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import popupCls from '../../../styles/popup.module.scss';
import cls from './OptionItem.module.scss';

export interface ListBoxItem<T extends string> {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}
interface OptionItemProps<T extends string> {
    item: ListBoxItem<T>;
}

export function OptionItem<T extends string>({ item }: OptionItemProps<T>) {
    return (
        <HListBox.Option
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            as={Fragment}
        >
            {({ active, selected }) => (
                <li
                    className={classNames(cls.item, {
                        [popupCls.active]: active,
                        [popupCls.disabled]: item.disabled,
                        [popupCls.selected]: selected,
                    })}
                >
                    <HStack gap="8" className={classNames(cls.wrap, {})}>
                        {item.content}
                        {selected && (
                            <Icon
                                Svg={CheckedIcon}
                                width="16"
                                height="16"
                                className={classNames(cls.icon, {})}
                            />
                        )}
                    </HStack>
                </li>
            )}
        </HListBox.Option>
    );
}

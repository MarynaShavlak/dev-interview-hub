import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { HStack } from '../../../../../redesigned/Stack';
import { Icon } from '../../../../Icon';
import CheckedIcon from '@/shared/assets/icons/done-20-20.svg';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import popupCls from '../../../styles/popup.module.scss';
import cls from './Option.module.scss';

export interface ListBoxItem<T extends string> {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}
interface OptionItemProps<T extends string> {
    item: ListBoxItem<T>;
}

function getOptionItemClassName(
    active: boolean,
    disabled?: boolean,
    selected?: boolean,
): string {
    return classNames(cls.item, {
        [popupCls.active]: active,
        [popupCls.disabled]: disabled,
        [popupCls.selected]: selected,
    });
}

export function Option<T extends string>({ item }: OptionItemProps<T>) {
    return (
        <HListBox.Option
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            as={Fragment}
        >
            {({ active, selected, disabled }) => (
                <li
                    className={getOptionItemClassName(
                        active,
                        disabled,
                        selected,
                    )}
                >
                    <HStack gap="8">
                        {item.content}
                        {selected && <Icon Svg={CheckedIcon} />}
                    </HStack>
                </li>
            )}
        </HListBox.Option>
    );
}

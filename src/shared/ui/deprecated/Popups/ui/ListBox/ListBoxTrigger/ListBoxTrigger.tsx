import { Listbox as HListBox } from '@headlessui/react';
import { Button } from '../../../../Button';
import { ListBoxItem } from '../Option/Option';
import cls from './ListBoxTrigger.module.scss';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Icon } from '../../../../Icon';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

interface ListBoxTriggerProps<T extends string> {
    selectedItem: ListBoxItem<T> | undefined;
    defaultValue?: string;
    readonly?: boolean;
}

export function ListBoxTrigger<T extends string>(
    props: ListBoxTriggerProps<T>,
) {
    const { selectedItem, defaultValue, readonly } = props;
    const btnFlexClasses = getFlexClasses({
        hStack: true,
        gap: '8',
        align: 'center',
    });

    return (
        <HListBox.Button
            className={classNames(cls.trigger, {}, btnFlexClasses)}
            as={Button}
            disabled={readonly}
        >
            {selectedItem?.label ?? defaultValue}
            <Icon Svg={ArrowIcon} width={32} height={32} />
        </HListBox.Button>
    );
}

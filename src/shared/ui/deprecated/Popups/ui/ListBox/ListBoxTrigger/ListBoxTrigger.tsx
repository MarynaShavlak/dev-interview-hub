import { Listbox as HListBox } from '@headlessui/react';
import { Button } from '../../../../Button';
import { ListBoxItem } from '../Option/Option';
import cls from './ListBoxTrigger.module.scss';

interface ListBoxTriggerProps<T extends string> {
    selectedItem: ListBoxItem<T> | undefined;
    defaultValue?: string;
    readonly?: boolean;
}

export function ListBoxTrigger<T extends string>(
    props: ListBoxTriggerProps<T>,
) {
    const { selectedItem, defaultValue, readonly } = props;

    return (
        <HListBox.Button
            className={cls.trigger}
            as={Button}
            disabled={readonly}
        >
            {selectedItem?.content ?? defaultValue}
        </HListBox.Button>
    );
}

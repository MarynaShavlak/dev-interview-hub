import { Listbox as HListBox } from '@headlessui/react';
import { Button } from '../../../../Button';
import { Icon } from '../../../../Icon';
import { ListBoxItem } from '../Option/Option';
import cls from './ListBoxTrigger.module.scss';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

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
            variant="filled"
            disabled={readonly}
            addonRight={<Icon Svg={ArrowIcon} />}
        >
            {selectedItem?.content ?? defaultValue}
        </HListBox.Button>
    );
}

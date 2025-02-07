import { Listbox as HListBox } from '@headlessui/react';
import { Button } from '../../../../Button';
import { Icon } from '../../../../Icon';
import { ListBoxItem } from '../Option/Option';
import cls from './ListBoxTrigger.module.scss';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

interface ListBoxTriggerProps<T extends string> {
    selectedItem: ListBoxItem<T> | undefined;
    defaultValue?: string;
    readonly?: boolean;
    handleClick?: () => void;
    className?: string;
}

export function ListBoxTrigger<T extends string>(
    props: ListBoxTriggerProps<T>,
) {
    const { selectedItem, defaultValue, readonly, handleClick, className } =
        props;
    // console.log('selectedItem', selectedItem);
    // console.log('defaultValue', defaultValue);
    return (
        <HListBox.Button
            className={classNames(cls.trigger, {}, [className])}
            as={Button}
            variant="filled"
            disabled={readonly}
            addonRight={<Icon Svg={ArrowIcon} />}
            onClick={handleClick}
        >
            {selectedItem?.label ?? defaultValue}
        </HListBox.Button>
    );
}

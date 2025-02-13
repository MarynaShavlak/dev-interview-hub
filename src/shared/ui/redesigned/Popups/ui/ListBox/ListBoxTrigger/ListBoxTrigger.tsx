import { Listbox as HListBox } from '@headlessui/react';
import { Button } from '../../../../Button';
import { Icon } from '../../../../Icon';
import { ListBoxItem } from '../Option/Option';
import cls from './ListBoxTrigger.module.scss';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { capitalizeFirstLetter } from '@/shared/lib/text/capitalizeFirstLetter/capitalizeFirstLetter';

export type ListBoxTriggerSize = 's' | 'm';
interface ListBoxTriggerProps<T extends string> {
    selectedItem: ListBoxItem<T> | undefined;
    defaultValue?: string;
    readonly?: boolean;
    handleClick?: () => void;
    className?: string;
    size?: ListBoxTriggerSize;
}

export function ListBoxTrigger<T extends string>(
    props: ListBoxTriggerProps<T>,
) {
    const {
        selectedItem,
        defaultValue,
        readonly,
        handleClick,
        className,
        size = 'm',
    } = props;

    const showText =
        defaultValue && capitalizeFirstLetter(defaultValue.toLowerCase());
    return (
        <HListBox.Button
            className={classNames(cls.trigger, {}, [className])}
            as={Button}
            variant="filled"
            disabled={readonly}
            addonRight={<Icon Svg={ArrowIcon} />}
            onClick={handleClick}
            size={size}
        >
            {selectedItem?.label ?? showText}
        </HListBox.Button>
    );
}

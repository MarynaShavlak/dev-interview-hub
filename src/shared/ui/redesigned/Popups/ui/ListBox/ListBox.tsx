import { Listbox as HListBox } from '@headlessui/react';
import { useMemo } from 'react';
import { Each } from '@/shared/lib/components/Each/Each';
import { SelectedItem } from './SelectedItem/SelectedItem';
import { ListBoxItem, OptionItem } from './OptionItem/OptionItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { HStack } from '../../../../redesigned/Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import cls from './ListBox.module.scss';

interface ListBoxProps<T extends string> {
    items?: ListBoxItem<T>[];
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom right',
        label,
    } = props;

    const optionsClasses = [mapDirectionClass[direction], popupCls.menu];
    const listBoxClasses = classNames(cls.ListBox, {}, [
        className,
        popupCls.popup,
    ]);
    const selectedItem = useMemo(() => {
        return items?.find((item) => item.value === value);
    }, [items, value]);

    const renderOptions = () => {
        if (!items) return null;
        return (
            <Each
                of={items}
                render={(item) => <OptionItem key={item.value} item={item} />}
            />
        );
    };

    return (
        <HStack gap="4">
            {label && <span>{`${label}:`}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                className={listBoxClasses}
                value={value}
                onChange={onChange}
            >
                <SelectedItem
                    selectedItem={selectedItem}
                    defaultValue={defaultValue}
                    readonly={readonly}
                />
                <HListBox.Options
                    className={classNames(cls.options, {}, optionsClasses)}
                >
                    {renderOptions()}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
}

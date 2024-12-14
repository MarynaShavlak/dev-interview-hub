import { Listbox as HListBox } from '@headlessui/react';
import { useMemo } from 'react';
import { Each } from '@/shared/lib/components/Each/Each';
import { ListBoxTrigger } from './ListBoxTrigger/ListBoxTrigger';
import { ListBoxItem, Option } from './Option/Option';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { HStack } from '../../../../common/Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import cls from './ListBox.module.scss';

interface ListBoxProps<T extends string> {
    items: ListBoxItem<T>[] | any;
    onChange: (value: T) => void;
    value?: T;
    defaultValue?: string;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
    className?: string;
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

    const optionsClasses = classNames(cls.options, {}, [
        mapDirectionClass[direction],
        popupCls.menuRedesigned,
    ]);

    const listBoxClasses = classNames(cls.ListBox, {}, [
        className,
        popupCls.popup,
    ]);

    const selectedItem = useMemo(() => {
        // @ts-ignore
        return items?.find((item) => item.value === value);
    }, [items, value]);
    console.log('value', value, items);

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
                <ListBoxTrigger
                    selectedItem={selectedItem}
                    defaultValue={defaultValue}
                    readonly={readonly}
                />
                <HListBox.Options className={optionsClasses}>
                    <Each
                        of={items}
                        render={(item) => (
                            // @ts-ignore
                            <Option key={item.value} item={item} />
                        )}
                    />
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
}

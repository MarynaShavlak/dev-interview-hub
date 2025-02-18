import { Listbox as HListBox } from '@headlessui/react';
import { useMemo } from 'react';
import { ListBoxItem, Option } from './Option/Option';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { HStack } from '../../../../common/Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import cls from './ListBox.module.scss';
import { ListBoxTrigger } from './ListBoxTrigger/ListBoxTrigger';

interface ListBoxProps<T extends string> {
    items: ListBoxItem<T>[];
    onChange: (value: T) => void;
    value?: T;
    defaultValue?: string;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
    className?: string;
    withBorder?: boolean;
}

/**
 * Deprecated, use new component from directory redesigned
 * @deprecated
 */
export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom right',
        withBorder = false,
        label,
    } = props;

    const optionsClasses = classNames(cls.options, {}, [
        mapDirectionClass[direction],
    ]);
    const listBoxClasses = classNames(
        cls.ListBox,
        { [cls.withBorder]: withBorder },
        [className, popupCls.popup],
    );
    console.log('items', items, value);
    const selectedItem = useMemo(() => {
        return items?.find((item) => item.value === value);
    }, [items, value]);
    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}
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
                            <Option key={item.value} item={item} />
                        )}
                    />
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
}

import { Listbox as HListBox } from '@headlessui/react';
import { useCallback, useMemo, useState } from 'react';
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
    const [isOpen, setIsOpen] = useState(false);

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
    // console.log('value', value, items);

    const onChangeOption = useCallback(
        (val: T) => {
            onChange(val);
            setIsOpen(false);
        },
        [onChange],
    );

    return (
        <HStack gap="4" justify="between" max>
            {label && <span>{`${label}:`}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                className={classNames(listBoxClasses, {}, [
                    isOpen ? cls.visible : cls.invisible,
                ])}
                value={value}
                onChange={onChangeOption}
            >
                <ListBoxTrigger
                    selectedItem={selectedItem}
                    defaultValue={defaultValue}
                    readonly={readonly}
                    handleClick={() => setIsOpen((prev) => !prev)}
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

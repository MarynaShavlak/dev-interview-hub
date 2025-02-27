import { Listbox as HListBox } from '@headlessui/react';
import { useCallback, useMemo, useState } from 'react';
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
    max?: boolean;
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
        max = false,
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    const optionsClasses = classNames(cls.options, {}, [
        mapDirectionClass[direction],
    ]);
    const listBoxClasses = classNames('', { [cls.withBorder]: withBorder }, [
        className,
        popupCls.popup,
    ]);
    // console.log('items', items, value);
    const selectedItem = useMemo(() => {
        return items?.find((item) => item.value === value);
    }, [items, value]);

    const onChangeOption = useCallback(
        (val: T) => {
            onChange(val);
            setIsOpen(false);
        },
        [onChange],
    );
    return (
        <HStack gap="4" max={max}>
            {label && <span className={cls.label}>{`${label}>`}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                value={value}
                onChange={onChangeOption}
                className={classNames(listBoxClasses, {}, [
                    isOpen ? cls.visible : cls.invisible,
                ])}
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
                            <Option key={item.value} item={item} />
                        )}
                    />
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
}

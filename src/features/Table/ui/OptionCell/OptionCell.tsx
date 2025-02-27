import { CellContext } from '@tanstack/react-table';
import { useCallback } from 'react';
import { ListBox as ListBoxRedesigned } from '@/shared/ui/redesigned/Popups';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Text } from '@/shared/ui/redesigned/Text';
import { ColorIndicatorOptionItem } from '../ColorIndicatorOptionItem/ColorIndicatorOptionItem';

import cls from './OptionCell.module.scss';
import { extractOptionValueName } from '../../lib/utilities/optionCell/extractOptionValueName/extractOptionValueName';
import { findNewOptionValue } from '../../lib/utilities/optionCell/findNewOptionValue/findNewOptionValue';
import { isColorOption } from '../../lib/utilities/optionCell/isColorOption/isColorOption';
import { ColorOption } from '../../model/types/tableTypes';
import { HStack } from '@/shared/ui/common/Stack';
import { toggleFeatures } from '@/shared/lib/features';
import { useGetUserRoles } from '@/entities/User';

interface OptionCellProps<TData> extends CellContext<TData, any> {
    options: (ColorOption | string)[];
    isEditRoleMode: boolean;
    updateRow: (id: string, columnId: string, newValue: any) => void;
}

const createListBoxOption = (option: ColorOption | string) => {
    const value = isColorOption(option) ? option.name : option;
    const content = isColorOption(option) ? (
        <ColorIndicatorOptionItem className={cls.optionItem} option={option} />
    ) : (
        <Text text={option} size="s" />
    );
    return { value, label: content };
};

export const OptionCell = <TData extends { id: string }>({
    getValue,
    row,
    column,

    options,
    isEditRoleMode,
    updateRow,
}: OptionCellProps<TData>) => {
    const value = getValue();

    const currentValue = extractOptionValueName(value);
    const listBoxOptions = options.map(createListBoxOption);

    const onCellClick = useCallback(
        (selectedValue: string | null) => {
            const newValue = findNewOptionValue(options, selectedValue);

            if (updateRow) {
                const newValueName = isColorOption(newValue)
                    ? newValue.name.toUpperCase()
                    : newValue;

                if (newValueName !== currentValue) {
                    updateRow(row.original.id, column.id, newValueName);
                }
            }
        },
        [column.id, currentValue, options, row.original.id, updateRow],
    );

    const { isAdmin, isManager } = useGetUserRoles();

    if (isAdmin && !isEditRoleMode) {
        return (
            <ColorIndicatorOptionItem
                option={value}
                className={cls.colorOptionItem}
            />
        );
    }

    const ListBox = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => ListBoxRedesigned,
        off: () => ListBoxDeprecated,
    });

    return (
        <HStack max className={cls.optionCell}>
            <ListBox
                value={currentValue}
                defaultValue={currentValue}
                items={listBoxOptions}
                onChange={onCellClick}
                direction="bottom right"
                size="s"
                max
            />
        </HStack>
    );
};

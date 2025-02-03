import { CellContext } from '@tanstack/react-table';
import { useCallback } from 'react';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text';
import { ColorIndicatorOptionItem } from '../../../../widgets/UsersFullInfoTable/ui/ColorIndicatorOptionItem/ColorIndicatorOptionItem';
import { TableMetaCustom } from '../../../../widgets/UsersFullInfoTable/model/types/types';
import cls from './OptionCell.module.scss';
import { extractOptionValueName } from '../../../../widgets/UsersFullInfoTable/lib/helpers/optionCell/extractOptionValueName/extractOptionValueName';
import { findNewOptionValue } from '../../../../widgets/UsersFullInfoTable/lib/helpers/optionCell/findNewOptionValue/findNewOptionValue';
import { isColorOption } from '../../../../widgets/UsersFullInfoTable/lib/helpers/optionCell/isColorOption/isColorOption';
import { ColorOption } from '../../model/types/tableTypes';

interface OptionCellProps<TData> extends CellContext<TData, any> {
    options: (ColorOption | string)[];
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

export const OptionCell = <TData,>({
    getValue,
    row,
    column,
    table,
    options,
}: OptionCellProps<TData>) => {
    const value = getValue();
    const meta = table.options.meta as TableMetaCustom<TData>;
    const currentValue = extractOptionValueName(value);
    const listBoxOptions = options.map(createListBoxOption);

    const onCellClick = useCallback(
        (selectedValue: string | null) => {
            const newValue = findNewOptionValue(options, selectedValue);
            if (meta?.updateData) {
                const newValueName = isColorOption(newValue)
                    ? newValue.name
                    : newValue;
                if (newValueName !== currentValue) {
                    meta.updateData(row.index, column.id, newValue);
                }
            }
        },
        [column.id, currentValue, meta, options, row.index],
    );

    return (
        <ListBox
            value={currentValue}
            defaultValue={currentValue}
            items={listBoxOptions}
            onChange={onCellClick}
            direction="bottom right"
        />
    );
};

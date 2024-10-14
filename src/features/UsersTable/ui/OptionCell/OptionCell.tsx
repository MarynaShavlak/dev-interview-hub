import { CellContext } from '@tanstack/react-table';
import { useCallback } from 'react';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ColorIndicatorOptionItem } from '../ColorIndicatorOptionItem/ColorIndicatorOptionItem';
import { ColorOption, TableMetaCustom } from '../../model/types/types';
import cls from './OptionCell.module.scss';

interface OptionCellProps<TData> extends CellContext<TData, any> {
    options: ColorOption[];
}

export const OptionCell = <TData,>({
    getValue,
    row,
    column,
    table,
    options,
}: OptionCellProps<TData>) => {
    const { name } = getValue() || {};
    // console.log('name', name);
    const meta = table.options.meta as TableMetaCustom<TData>;
    const currentValue = name;

    const listBoxOptions = options.map((option) => ({
        value: `${option.name}`,
        content: (
            <ColorIndicatorOptionItem
                className={cls.colorIndicatorOptionItem}
                option={option}
            />
        ),
    }));

    const onCellClick = useCallback(
        (selectedValue: string | null) => {
            const newValue = options.find(
                (option) => option.name === selectedValue,
            );
            if (meta?.updateData && newValue?.name !== currentValue) {
                meta.updateData(row.index, column.id, newValue);
            }
        },
        [column.id, currentValue, meta, options, row.index],
    );

    const props = {
        value: name,
        defaultValue: name,
        items: listBoxOptions,
        onChange: onCellClick,
        direction: 'bottom right' as const,
    };

    return <ListBox {...props} />;
};

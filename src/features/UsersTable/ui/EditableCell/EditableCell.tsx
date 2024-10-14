import { CellContext } from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';
import { Input } from '@/shared/ui/redesigned/Input';
import cls from './EditableCell.module.scss';
import { TableMetaCustom } from '../../model/types/types';
import { trimText } from '@/shared/lib/text/trimText/trimText';

export type EditableCellProps<TData> = CellContext<TData, string>;

export const EditableCell = <TData,>({
    getValue,
    row,
    column,
    table,
}: EditableCellProps<TData>) => {
    const initialValue = getValue() ?? '';
    const [value, setValue] = useState<string>(initialValue);
    const meta = table.options.meta as TableMetaCustom<TData>;

    const onBlur = useCallback(() => {
        if (meta?.updateData) {
            const trimmedValue = trimText(value);
            meta.updateData(row.index, column.id, trimmedValue);
        }
    }, [column.id, meta, row.index, value]);

    const onChangeCell = useCallback((newValue?: string) => {
        setValue(newValue ?? '');
    }, []);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <Input
            value={value}
            onChange={onChangeCell}
            className={cls.cellInput}
            onBlur={onBlur}
            clear
        />
    );
};

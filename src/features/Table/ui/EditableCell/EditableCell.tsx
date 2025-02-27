import { CellContext } from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';
import { Input } from '@/shared/ui/redesigned/Input';
import cls from './EditableCell.module.scss';

import { trimText } from '@/shared/lib/text/trimText/trimText';
import { TableMetaCustom } from '../..';

export type EditableCellProps<T, IDType> = CellContext<T, IDType>;

export const EditableCell = <T, IDType>({
    getValue,
    row,
    column,
    table,
}: EditableCellProps<T, IDType>) => {
    const initialValue = getValue() ?? '';
    const [value, setValue] = useState<string>(String(initialValue));
    const meta = table.options.meta as TableMetaCustom<T>;

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
        setValue(String(initialValue));
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

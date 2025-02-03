import { Dispatch, SetStateAction } from 'react';
import { TableMeta } from '@tanstack/react-table';

export interface ColorOption {
    id: string;
    name: string;
    color: string;
}

export interface InputSearchType {
    id: string;
    value: string;
}

export interface FilterType {
    id: string;
    value: string[];
}

export type CommonFilterType = (InputSearchType | FilterType)[];

export interface ColumnFilterHandlerProps {
    setColumnFilters: Dispatch<SetStateAction<CommonFilterType>>;
}

export interface TableMetaCustom<TData> extends TableMeta<TData> {
    updateData: (rowIndex: number, columnId: string, value: any) => void;
}

import { Dispatch, SetStateAction } from 'react';

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

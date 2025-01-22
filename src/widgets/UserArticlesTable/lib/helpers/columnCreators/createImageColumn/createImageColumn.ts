import { CellContext } from '@tanstack/react-table';
import { createElement } from 'react';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { capitalizeFirstLetter } from '@/shared/lib/text/capitalizeFirstLetter/capitalizeFirstLetter';

type ImageColumnConfig<T> = {
    id: string;
    size: number;
    enableColumnFilter?: boolean;
    enableSorting?: boolean;
    className?: string;
};

export const createImageColumn = <T>() => {
    return ({
        id,
        size,
        className,
        enableColumnFilter = false,
        enableSorting = false,
    }: ImageColumnConfig<T>) => ({
        id,
        header: capitalizeFirstLetter(id),
        cell: (props: CellContext<T, any>) =>
            createElement(Avatar, {
                size: 30,
                className,
                src: props.getValue(),
            }),
        size,
        enableColumnFilter,
        enableSorting,
    });
};

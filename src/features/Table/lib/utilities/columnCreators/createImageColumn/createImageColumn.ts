import { CellContext } from '@tanstack/react-table';
import { createElement } from 'react';
import { Avatar as AvatarRedesigned } from '@/shared/ui/redesigned/Avatar';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { capitalizeFirstLetter } from '@/shared/lib/text/capitalizeFirstLetter/capitalizeFirstLetter';
import { toggleFeatures } from '@/shared/lib/features';

type ImageColumnConfig<T> = {
    id: string;
    size: number;
    enableColumnFilter?: boolean;
    enableSorting?: boolean;
    className?: string;
};

export const createImageColumn = <T>() => {
    const Avatar = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => AvatarRedesigned,
        off: () => AvatarDeprecated,
    });
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

import { Column } from '@tanstack/react-table';
import SortIcon from '@/shared/assets/icons/sort.svg';
import AscIcon from '@/shared/assets/icons/asc.svg';
import DescIcon from '@/shared/assets/icons/desc.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface SortingIconProps<T> {
    column: Column<T>;
}

export const SortingIcon = <T,>({ column }: SortingIconProps<T>) => {
    const isSorted = column.getIsSorted();
    return (
        <>
            {column.getCanSort() && (
                <Icon
                    Svg={SortIcon}
                    clickable
                    width={18}
                    height={18}
                    onClick={(event) => {
                        column.getToggleSortingHandler()?.(event);
                    }}
                />
            )}
            {isSorted && (
                <Icon
                    Svg={isSorted === 'asc' ? AscIcon : DescIcon}
                    width={25}
                    height={25}
                />
            )}
        </>
    );
};

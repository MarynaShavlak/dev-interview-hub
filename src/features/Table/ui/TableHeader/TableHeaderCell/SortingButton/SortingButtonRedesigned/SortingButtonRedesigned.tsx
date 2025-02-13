import AscIcon from '@/shared/assets/icons/asc.svg';
import DescIcon from '@/shared/assets/icons/desc.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import cls from '../SortingButton.module.scss';
import { SortingButtonProps } from '../SortingButton';

export const SortingButtonRedesigned = <T,>({
    column,
}: SortingButtonProps<T>) => {
    const isSorted = column.getIsSorted();

    if (!column.getCanSort()) return null;
    return (
        <>
            {isSorted && (
                <Icon
                    Svg={isSorted === 'asc' ? AscIcon : DescIcon}
                    width={24}
                    height={24}
                    clickable
                    onClick={(event) => {
                        column.getToggleSortingHandler()?.(event);
                    }}
                />
            )}
            {!isSorted && (
                <Icon
                    Svg={DescIcon}
                    width={24}
                    height={24}
                    clickable
                    className={cls.sortIcon}
                    onClick={(event) => {
                        column.getToggleSortingHandler()?.(event);
                    }}
                />
            )}
        </>
    );
};

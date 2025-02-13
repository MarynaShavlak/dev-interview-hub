import AscIcon from '@/shared/assets/icons/asc.svg';
import DescIcon from '@/shared/assets/icons/desc.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import cls from '../SortingButton.module.scss';
import { SortingButtonProps } from '../SortingButton';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

export const SortingButtonDeprecated = <T,>({
    column,
}: SortingButtonProps<T>) => {
    const isSorted = column.getIsSorted();

    const btnFlexClasses = getFlexClasses({
        hStack: true,
        align: 'center',
    });

    if (!column.getCanSort()) return null;
    return (
        <>
            {isSorted && (
                <Button
                    className={classNames('', {}, btnFlexClasses)}
                    theme={ButtonTheme.CLEAR}
                    onClick={(event) => {
                        column.getToggleSortingHandler()?.(event);
                    }}
                >
                    <Icon
                        Svg={isSorted === 'asc' ? AscIcon : DescIcon}
                        width={24}
                        height={24}
                    />
                </Button>
            )}
            {!isSorted && (
                <Button
                    className={classNames(cls.sortIcon, {}, btnFlexClasses)}
                    theme={ButtonTheme.CLEAR}
                    onClick={(event) => {
                        column.getToggleSortingHandler()?.(event);
                    }}
                >
                    <Icon Svg={DescIcon} width={24} height={24} />
                </Button>
            )}
        </>
    );
};

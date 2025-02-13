import { Text } from '@/shared/ui/deprecated/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';
import ArrowRightIcon from '@/shared/assets/icons/arrow-right.svg';
import { HStack } from '@/shared/ui/common/Stack';
import { useTablePagination } from '../../../lib/hooks/useTablePagination/useTablePagination';
import { TablePaginationProps } from '../TablePagination';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

export const TablePaginationDeprecated = <T,>({
    table,
}: TablePaginationProps<T>) => {
    const {
        isDisabledNextBtn,
        isDisabledPrevBtn,
        handlePrevBtnClick,
        handleNextBtnClick,
        paginationText,
    } = useTablePagination(table);

    const btnFlexClasses = getFlexClasses({
        hStack: true,
        align: 'center',
    });

    return (
        <HStack>
            <Text text={paginationText} />
            <HStack>
                <Button
                    className={classNames('', {}, btnFlexClasses)}
                    theme={ButtonTheme.CLEAR}
                    disabled={isDisabledPrevBtn}
                    onClick={handlePrevBtnClick}
                >
                    <Icon Svg={ArrowLeftIcon} width={32} height={32} />
                </Button>
                <Button
                    theme={ButtonTheme.CLEAR}
                    disabled={isDisabledNextBtn}
                    onClick={handleNextBtnClick}
                    className={classNames('', {}, btnFlexClasses)}
                >
                    <Icon Svg={ArrowRightIcon} width={32} height={32} />
                </Button>
            </HStack>
        </HStack>
    );
};

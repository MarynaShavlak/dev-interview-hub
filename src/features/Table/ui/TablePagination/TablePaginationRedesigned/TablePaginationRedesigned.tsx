import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';
import ArrowRightIcon from '@/shared/assets/icons/arrow-right.svg';
import { HStack } from '@/shared/ui/common/Stack';
import { useTablePagination } from '../../../lib/hooks/useTablePagination/useTablePagination';
import { TablePaginationProps } from '../TablePagination';

export const TablePaginationRedesigned = <T,>({
    table,
    className,
}: TablePaginationProps<T>) => {
    const {
        isDisabledNextBtn,
        isDisabledPrevBtn,
        handlePrevBtnClick,
        handleNextBtnClick,
        paginationText,
    } = useTablePagination(table);

    return (
        <HStack className={className}>
            <Text text={paginationText} />
            <HStack>
                <Icon
                    onClick={handlePrevBtnClick}
                    Svg={ArrowLeftIcon}
                    clickable
                    disabled={isDisabledPrevBtn}
                />
                <Icon
                    onClick={handleNextBtnClick}
                    Svg={ArrowRightIcon}
                    clickable
                    disabled={isDisabledNextBtn}
                />
            </HStack>
        </HStack>
    );
};

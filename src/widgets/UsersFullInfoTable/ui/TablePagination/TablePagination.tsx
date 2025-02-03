import { Table } from '@tanstack/react-table';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';

import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';
import ArrowRightIcon from '@/shared/assets/icons/arrow-right.svg';
import { HStack } from '@/shared/ui/common/Stack';

interface TablePaginationProps<T> {
    table: Table<T>;
}

export const TablePagination = <T,>({ table }: TablePaginationProps<T>) => {
    const { t } = useTranslation();

    const handlePrevBtnClick = useCallback(() => {
        table.previousPage();
    }, [table]);

    const handleNextBtnClick = useCallback(() => {
        table.nextPage();
    }, [table]);

    const paginationText =
        `${t('Сторінка')}` +
        ' ' +
        `${table.getState().pagination.pageIndex + 1}` +
        ' ' +
        `${t('із')}` +
        ' ' +
        `${table.getPageCount()}`;

    const isDisabledNextBtn = !table.getCanNextPage();
    const isDisabledPrevBtn = !table.getCanPreviousPage();

    return (
        <HStack>
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

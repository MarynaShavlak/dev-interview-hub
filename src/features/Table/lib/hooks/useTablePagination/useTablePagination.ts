import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { Table } from '@tanstack/react-table';

export const useTablePagination = <T>(table: Table<T>) => {
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
    return {
        isDisabledNextBtn,
        isDisabledPrevBtn,
        handlePrevBtnClick,
        handleNextBtnClick,
        paginationText,
    };
};

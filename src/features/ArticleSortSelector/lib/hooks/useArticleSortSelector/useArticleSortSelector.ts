import { useMemo } from 'react';
import { useOrderOptions, useSortFieldOptions } from '../useOptions/useOptions';
import { ArticleSortField } from '@/entities/Article';
import { ListBoxItem } from '@/shared/ui/deprecated/Popups/ui/ListBox/Option/Option';

export const useArticleSortSelector = () => {
    const rawOrderOptions = useOrderOptions();
    const orderOptions = useMemo(() => rawOrderOptions, [rawOrderOptions]);

    const rawSortFieldOptions = useSortFieldOptions();
    const sortTypeOptionsWithOrderValue = useMemo(
        () => rawSortFieldOptions,
        [rawSortFieldOptions],
    );

    const sortTypeOptionsWithNoOrder = sortTypeOptionsWithOrderValue
        .slice(0, 3)
        .map((option) => ({
            value: option.value.split('_')[1],
            label: option.label.split('   ↑')[0],
        })) as ListBoxItem<ArticleSortField>[];

    return {
        orderOptions,
        sortTypeOptionsWithOrderValue,
        sortTypeOptionsWithNoOrder,
    };
};

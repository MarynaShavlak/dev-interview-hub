import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import SearchIcon from '@/shared/assets/icons/search.svg';

import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
import {
    ColumnFilterHandlerProps,
    CommonFilterType,
} from '../../model/types/types';

interface SearchInputProps extends ColumnFilterHandlerProps {
    filterCategory: string;
    columnFilters: CommonFilterType;
}

export const SearchInput = (props: SearchInputProps) => {
    const { columnFilters, setColumnFilters, filterCategory } = props;

    const { t } = useTranslation();

    const filter = columnFilters.find((f) => f.id === filterCategory);
    const query =
        filter && typeof filter.value === 'string' ? filter.value : '';

    const onFilterChange = useCallback(
        (value: string) => {
            setColumnFilters((prevFilters) => {
                const existingFilter = prevFilters.find(
                    (f) => f.id === filterCategory,
                );
                if (existingFilter) {
                    return prevFilters.map((f) =>
                        f.id === filterCategory ? { ...f, value } : f,
                    );
                }
                return [...prevFilters, { id: filterCategory, value }];
            });
        },
        [filterCategory, setColumnFilters],
    );

    return (
        <Input
            onChange={onFilterChange}
            value={query}
            placeholder={t('Пошук')}
            addonLeft={<Icon Svg={SearchIcon} />}
        />
    );
};

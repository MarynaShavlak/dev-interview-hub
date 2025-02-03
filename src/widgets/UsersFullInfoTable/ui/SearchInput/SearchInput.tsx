import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import SearchIcon from '@/shared/assets/icons/search.svg';
import cls from './SearchInput.module.scss';

import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';

interface SearchInputProps {
    globalFilter: string;
    setGlobalFilter: (filterValue: string) => void;
}

export const SearchInput = ({
    globalFilter,
    setGlobalFilter,
}: SearchInputProps) => {
    const { t } = useTranslation();

    const onFilterChange = useCallback(
        (value: string) => {
            setGlobalFilter(value);
        },
        [setGlobalFilter],
    );

    return (
        <Input
            className={cls.searchInput}
            onChange={onFilterChange}
            value={globalFilter}
            placeholder={t('Search')}
            addonLeft={<Icon Svg={SearchIcon} />}
        />
    );
};

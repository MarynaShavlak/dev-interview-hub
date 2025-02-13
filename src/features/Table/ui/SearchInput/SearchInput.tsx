import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import SearchIcon from '@/shared/assets/icons/search.svg';
import cls from './SearchInput.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';

export interface SearchInputProps {
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
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Input
                    className={cls.searchInput}
                    onChange={onFilterChange}
                    value={globalFilter}
                    placeholder={t('Пошук')}
                    addonLeft={<Icon Svg={SearchIcon} />}
                />
            }
            off={
                <Card>
                    <InputDeprecated
                        className={cls.searchInput}
                        onChange={onFilterChange}
                        value={globalFilter}
                        placeholder={t('Пошук')}
                        withBorder
                    />
                </Card>
            }
        />
    );
};

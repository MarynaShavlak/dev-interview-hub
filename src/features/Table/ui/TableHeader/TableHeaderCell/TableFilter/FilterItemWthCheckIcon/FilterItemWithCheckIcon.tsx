import React, { useCallback } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './FilterItemWithCheckIcon.module.scss';

import { Icon } from '@/shared/ui/redesigned/Icon';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import EmptyCheckIcon from '@/shared/assets/icons/checkbox-empty.svg';
import CheckedIcon from '@/shared/assets/icons/checkbox-check.svg';
import { HStack } from '@/shared/ui/common/Stack';
import { ColumnFilterHandlerProps } from '../../../../../model/types/tableTypes';
import { getStringOptions } from '../../../../../lib/utilities/getStringOptions/getStringOptions';
import { useStringOptionsFilterOperations } from '../../../../../lib/hooks/useStringOptionsFilterOperations/useStringOptionsFilterOperations';

import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';

interface FilterItemProps extends ColumnFilterHandlerProps {
    option: string;
    isActive?: boolean;
    filterCategory: string;
}

export const FilterItemWithCheckIcon = (props: FilterItemProps) => {
    const { option, setColumnFilters, isActive, filterCategory } = props;
    const { addNewFilter, updateExistingFilter } =
        useStringOptionsFilterOperations();

    const onClickHandler = useCallback(
        () =>
            setColumnFilters((prev) => {
                const existingFilter = prev.find(
                    (filter) => filter.id === filterCategory,
                );

                const options = existingFilter?.value;
                const stringOptions = getStringOptions(options);
                if (!stringOptions) {
                    return addNewFilter(prev, filterCategory, option);
                }
                return updateExistingFilter(
                    prev,
                    filterCategory,
                    option,
                    isActive ?? false,
                    stringOptions,
                );
            }),
        [
            addNewFilter,
            filterCategory,
            isActive,
            option,
            setColumnFilters,
            updateExistingFilter,
        ],
    );

    const NotSelectedIcon = (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<Icon Svg={EmptyCheckIcon} width={15} height={15} />}
            off={<IconDeprecated Svg={EmptyCheckIcon} width={15} height={15} />}
        />
    );
    const SelectedIcon = (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<Icon Svg={CheckedIcon} width={15} height={15} />}
            off={<IconDeprecated Svg={CheckedIcon} width={15} height={15} />}
        />
    );

    const filterItemClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.filterItemRedesigned,
        off: () => cls.filterItemDeprecated,
    });

    const activeClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.activeRedesigned,
        off: () => cls.activeDeprecated,
    });

    return (
        <HStack
            max
            className={classNames(
                filterItemClass,
                { [activeClass]: isActive },
                [],
            )}
            gap="8"
            onClick={onClickHandler}
        >
            {!isActive && NotSelectedIcon}
            {isActive && SelectedIcon}
            {option || '-'}
        </HStack>
    );
};

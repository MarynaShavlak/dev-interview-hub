import { useCallback } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './FilterItemWithCheckIcon.module.scss';

import { Icon } from '@/shared/ui/redesigned/Icon';
import EmptyCheckIcon from '@/shared/assets/icons/checkbox-empty.svg';
import CheckedIcon from '@/shared/assets/icons/checkbox-check.svg';
import { HStack } from '@/shared/ui/common/Stack';
import { ColumnFilterHandlerProps } from '../../../../..';
import { getStringOptions } from '../../../../../lib/utilities/getStringOptions/getStringOptions';
import { useStringOptionsFilterOperations } from '../../../../../lib/hooks/useStringOptionsFilterOperations/useStringOptionsFilterOperations';

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
    return (
        <HStack
            max
            className={classNames(
                cls.filterItem,
                { [cls.active]: isActive },
                [],
            )}
            gap="8"
            onClick={onClickHandler}
        >
            {!isActive && <Icon Svg={EmptyCheckIcon} width={15} height={15} />}
            {isActive && <Icon Svg={CheckedIcon} width={15} height={15} />}
            {option || '-'}
        </HStack>
    );
};

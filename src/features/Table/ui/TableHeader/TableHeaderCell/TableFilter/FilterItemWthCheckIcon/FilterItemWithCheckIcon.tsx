import { useCallback } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './FilterItemWithCheckIcon.module.scss';

import { Icon } from '@/shared/ui/redesigned/Icon';
import EmptyCheckIcon from '@/shared/assets/icons/checkbox-empty.svg';
import CheckedIcon from '@/shared/assets/icons/checkbox-check.svg';
import { HStack } from '@/shared/ui/common/Stack';
import { ColumnFilterHandlerProps } from '../../../../..';

interface FilterItemProps extends ColumnFilterHandlerProps {
    option: string;
    isActive?: boolean;
    filterCategory: string;
}

export const FilterItemWithCheckIcon = (props: FilterItemProps) => {
    const { option, setColumnFilters, isActive, filterCategory } = props;

    const onClickHandler = useCallback(
        () =>
            setColumnFilters((prev) => {
                const options = prev.find(
                    (filter) => filter.id === filterCategory,
                )?.value;

                if (!options) {
                    return [...prev, { id: filterCategory, value: [option] }];
                }

                return prev.map((f) => {
                    if (f.id === filterCategory) {
                        let newValue;

                        if (Array.isArray(options)) {
                            if (isActive) {
                                newValue = options.filter((o) => o !== option);
                            } else {
                                newValue = options.concat(option);
                            }
                        } else {
                            newValue = [option];
                        }

                        return {
                            ...f,
                            value: newValue,
                        };
                    }
                    return f;
                });
            }),
        [filterCategory, isActive, option, setColumnFilters],
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
            {option}
        </HStack>
    );
};

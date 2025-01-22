import { useCallback } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './FilterItemWithIndicator.module.scss';
import { ColorIndicatorOptionItem } from '../../ColorIndicatorOptionItem/ColorIndicatorOptionItem';
import {
    ColorOption,
    ColumnFilterHandlerProps,
} from '../../../model/types/types';

interface FilterItemProps extends ColumnFilterHandlerProps {
    option: ColorOption;
    isActive?: boolean;
    filterCategory: string;
}

export const FilterItemWithIndicator = (props: FilterItemProps) => {
    const { option, setColumnFilters, isActive, filterCategory } = props;
    const { id } = option;

    const onClickHandler = useCallback(
        () =>
            setColumnFilters((prev) => {
                // console.log('prev', prev);

                const options = prev.find(
                    (filter) => filter.id === filterCategory,
                )?.value;

                if (!options) {
                    return [...prev, { id: filterCategory, value: [id] }];
                }

                return prev.map((f) => {
                    if (f.id === filterCategory) {
                        let newValue;

                        if (Array.isArray(options)) {
                            if (isActive) {
                                newValue = options.filter((o) => o !== id);
                            } else {
                                newValue = options.concat(id);
                            }
                        } else {
                            newValue = [id];
                        }

                        return {
                            ...f,
                            value: newValue,
                        };
                    }
                    return f;
                });
            }),
        [filterCategory, id, isActive, setColumnFilters],
    );
    return (
        <VStack
            max
            className={classNames(
                cls.filterItem,
                { [cls.active]: isActive },
                [],
            )}
            onClick={onClickHandler}
        >
            <ColorIndicatorOptionItem option={option} />
        </VStack>
    );
};

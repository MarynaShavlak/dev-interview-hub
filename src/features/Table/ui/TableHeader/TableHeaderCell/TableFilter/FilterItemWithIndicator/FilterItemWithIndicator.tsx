import { useCallback } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './FilterItemWithIndicator.module.scss';
import {
    ColorOption,
    ColumnFilterHandlerProps,
} from '../../../../../model/types/tableTypes';
import { ColorIndicatorOptionItem } from '../../../../ColorIndicatorOptionItem/ColorIndicatorOptionItem';

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
                console.log('prev', prev);

                const options = prev.find(
                    (filter) => filter.id === filterCategory,
                )?.value;
                const colorOptions = Array.isArray(options)
                    ? options?.filter(
                          (option): option is ColorOption =>
                              typeof option !== 'string',
                      )
                    : null;

                console.log('colorOptions', colorOptions);

                if (!colorOptions) {
                    return [...prev, { id: filterCategory, value: [option] }];
                }

                return prev.map((f) => {
                    console.log('!!!!!filterCategory', filterCategory);
                    console.log('f', f);
                    console.log('options', colorOptions);
                    if (f.id === filterCategory) {
                        let newValue;
                        console.log('isActive', isActive);

                        if (Array.isArray(colorOptions)) {
                            if (isActive) {
                                newValue = colorOptions.filter(
                                    (o) => o.id !== option.id,
                                );
                            } else {
                                newValue = colorOptions.concat(option);
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
        [filterCategory, id, isActive, option, setColumnFilters],
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

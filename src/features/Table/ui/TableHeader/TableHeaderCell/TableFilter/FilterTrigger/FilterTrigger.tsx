import React from 'react';
import FilterIcon from '@/shared/assets/icons/filter.svg';

import { Icon } from '@/shared/ui/redesigned/Icon';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './FilterTrigger.module.scss';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface FilterTriggerProps {
    isFilterActive: boolean;
}

export const FilterTrigger = ({ isFilterActive }: FilterTriggerProps) => {
    const additionalClasses = getFlexClasses({
        vStack: true,
        justify: 'center',
    });

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Icon
                    width="18"
                    height="18"
                    Svg={FilterIcon}
                    className={classNames(
                        cls.filterIcon,
                        { [cls.isFilterActive]: isFilterActive },
                        [...additionalClasses],
                    )}
                />
            }
            off={
                <IconDeprecated
                    width="18"
                    height="18"
                    Svg={FilterIcon}
                    className={classNames(
                        cls.filterIcon,
                        { [cls.isFilterActive]: isFilterActive },
                        [...additionalClasses],
                    )}
                />
            }
        />
    );
};

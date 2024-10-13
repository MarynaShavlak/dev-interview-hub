import FilterIcon from '@/shared/assets/icons/filter.svg';

import { Icon } from '@/shared/ui/redesigned/Icon';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './FilterTrigger.module.scss';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

interface FilterTriggerProps {
    isFilterActive: boolean;
}

export const FilterTrigger = ({ isFilterActive }: FilterTriggerProps) => {
    const additionalClasses = getFlexClasses({
        vStack: true,
        justify: 'center',
    });

    return (
        <Icon
            width="20"
            height="20"
            Svg={FilterIcon}
            className={classNames(
                cls.filterIcon,
                { [cls.isFilterActive]: isFilterActive },
                [...additionalClasses],
            )}
        />
    );
};

// <Button
//     size="m"
//     variant="clear"
//     addonLeft={<IconCustom width="20" height="20" Svg={FilterIcon} />}
//     className={classNames(
//         cls.filterIcon,
//         { [cls.isFilterActive]: isFilterActive },
//         [],
//     )}
// >
//     {t('Фільтр')}
// </Button>

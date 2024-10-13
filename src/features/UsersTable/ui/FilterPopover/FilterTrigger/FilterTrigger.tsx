import { useTranslation } from 'react-i18next';
import FilterIcon from '@/shared/assets/icons/filter.svg';

import { Button } from '@/shared/ui/redesigned/Button';
import { Icon as IconCustom } from '@/shared/ui/redesigned/Icon';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './FilterTrigger.module.scss';

interface FilterTriggerProps {
    isFilterActive: boolean;
}

export const FilterTrigger = ({ isFilterActive }: FilterTriggerProps) => {
    const { t } = useTranslation();

    return (
        <Button
            size="m"
            variant="clear"
            addonLeft={<IconCustom width="20" height="20" Svg={FilterIcon} />}
            className={classNames(
                cls.filterIcon,
                { [cls.isFilterActive]: isFilterActive },
                [],
            )}
        >
            {t('Фільтр')}
        </Button>
    );
};

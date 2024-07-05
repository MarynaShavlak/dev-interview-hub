import { useTranslation } from 'react-i18next';
import { SelectOption } from '@/shared/ui/deprecated/Select';
import { Country } from '../../model/types/country';

export const useCountryOptions = () => {
    const { t } = useTranslation('profile');
    return [
        {
            value: Country.Ukraine,
            content: t('Україна'),
        },
        {
            value: Country.Poland,
            content: t('Польща'),
        },
        {
            value: Country.Croatia,
            content: t('Хорватія'),
        },
        {
            value: Country.Germany,
            content: t('Німмеччина'),
        },
        {
            value: Country.Ireland,
            content: t('Ірландія'),
        },
    ] as SelectOption<Country>[];
};

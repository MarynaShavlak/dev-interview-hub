import { useTranslation } from 'react-i18next';
import { SelectOption } from '@/shared/ui/deprecated/Select';
import { Country } from '../../model/types/country';

/**
 * Custom hook for retrieving localized country options for selection.
 * Utilizes the `useTranslation` hook from `react-i18next` to provide localized country names.
 *
 * @returns {SelectOption<Country>[]} An array of country options where each option contains:
 *  * `value`: A `Country` enum value representing the country type.
 *  * `content`: A localized string representing the country name in Ukrainian.
 *
 */

export const useCountryOptions = () => {
    const { t } = useTranslation('profile');
    return [
        {
            value: Country.Ukraine,
            label: t('Україна'),
        },
        {
            value: Country.Poland,
            label: t('Польща'),
        },
        {
            value: Country.Croatia,
            label: t('Хорватія'),
        },
        {
            value: Country.Germany,
            label: t('Німмеччина'),
        },
        {
            value: Country.Ireland,
            label: t('Ірландія'),
        },
        {
            value: Country.Another,
            label: t('Інша'),
        },
        {
            value: Country.USA,
            label: t('США'),
        },
        {
            value: Country.Austria,
            label: t('Австрія'),
        },
        {
            value: Country.Canada,
            label: t('Канада'),
        },
    ] as SelectOption<Country>[];
};

// USA = 'USA',
//     England = 'England',
//     Austria = 'Austria',
//     Canada = 'Canada',

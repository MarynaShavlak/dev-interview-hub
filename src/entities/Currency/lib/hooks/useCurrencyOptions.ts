import { useTranslation } from 'react-i18next';
import { Currency } from '../../model/types/currency';
import { SelectOption } from '@/shared/ui/deprecated/Select';

/**
 * Custom hook for retrieving localized currency options for selection.
 * Utilizes the `useTranslation` hook from `react-i18next` to provide localized currency names.
 *
 * @returns {SelectOption<Currency>[]} An array of currency options where each option contains:
 *  * `value`: A `Currency` enum value representing the currency type.
 *  * `content`: A localized string representing the currency name in Ukrainian.
 *
 */

export const useCurrencyOptions = () => {
    const { t } = useTranslation('profile');
    return [
        {
            value: Currency.UAH,
            content: t('гривня'),
        },
        {
            value: Currency.EUR,
            content: t('євро'),
        },
        {
            value: Currency.USD,
            content: t('долар'),
        },
    ] as SelectOption<Currency>[];
};

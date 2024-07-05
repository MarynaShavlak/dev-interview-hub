import { useTranslation } from 'react-i18next';
import { Currency } from '../../model/types/currency';
import { SelectOption } from '@/shared/ui/deprecated/Select';

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

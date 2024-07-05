import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useCurrencyOptions } from '../../lib/hooks/useCurrencyOptions';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

export const CurrencySelect = memo(
    ({ className, value, onChange, readonly }: CurrencySelectProps) => {
        const { t } = useTranslation();
        const options = useCurrencyOptions();

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Currency);
            },
            [onChange],
        );
        const label = toggleFeatures({
            name: 'isAppRedesigned',
            off: () => t('Укажіть валюту'),
            on: () => t('Валюта'),
        });

        const props = {
            className,
            value,
            defaultValue: t('Укажіть валюту'),
            label: label as string,
            items: options,
            onChange: onChangeHandler,
            readonly,
            direction: 'top right' as const,
        };

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<ListBox {...props} />}
                off={<ListBoxDeprecated {...props} />}
            />
        );
    },
);

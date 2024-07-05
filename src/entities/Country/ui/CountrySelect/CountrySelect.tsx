import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useCountryOptions } from '../../lib/hooks/useCountryOptions';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

export const CountrySelect = memo(
    ({ className, value, onChange, readonly }: CountrySelectProps) => {
        const { t } = useTranslation();
        const options = useCountryOptions();

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Country);
            },
            [onChange],
        );
        const label = toggleFeatures({
            name: 'isAppRedesigned',
            off: () => t('Укажіть країну'),
            on: () => t('Країна'),
        });

        const props = {
            className,
            value,
            defaultValue: t('Укажіть країну'),
            label,
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

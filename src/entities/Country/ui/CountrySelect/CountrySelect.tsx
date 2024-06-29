import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.Ukraine, content: Country.Ukraine },
    { value: Country.Poland, content: Country.Poland },
    { value: Country.Ireland, content: Country.Ireland },
    { value: Country.Germany, content: Country.Germany },
    { value: Country.Croatia, content: Country.Croatia },
];

export const CountrySelect = memo(
    ({ className, value, onChange, readonly }: CountrySelectProps) => {
        const { t } = useTranslation();

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Country);
            },
            [onChange],
        );

        const props = {
            className,
            value,
            defaultValue: t('Укажіть країну'),
            label: t('Укажіть країну'),
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

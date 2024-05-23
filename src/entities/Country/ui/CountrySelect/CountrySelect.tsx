import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
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

export const CountrySelect = memo(({
    className, value, onChange, readonly,
}: CountrySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <ListBox
            className={classNames('', {}, [className])}
            label={t('Укажіть країну')}
            items={options}
            value={value}
            defaultValue={t('Укажіть країну')}
            onChange={onChangeHandler}
            readonly={readonly}
            direction="top right"
        />
    );
});

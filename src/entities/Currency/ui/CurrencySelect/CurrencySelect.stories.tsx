import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CurrencySelect } from './CurrencySelect';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Currency } from '../../model/types/currency';
import { AlignDecorator } from '@/shared/config/storybook/AlignDecorator/AlignDecorator';

export default {
    title: 'entities/Currency/CurrencySelect',
    component: CurrencySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => {
    const { value } = args;
    const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
        value || Currency.USD,
    );

    return (
        <CurrencySelect
            {...args}
            value={selectedCurrency}
            onChange={(newValue) => setSelectedCurrency(newValue)}
        />
    );
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [AlignDecorator('center')];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [AlignDecorator('center'), NewDesignDecorator];

export const Readonly = Template.bind({});
Readonly.args = {
    value: Currency.USD,
    readonly: true,
};
Readonly.decorators = [AlignDecorator('center')];

export const ReadonlyRedesigned = Template.bind({});
ReadonlyRedesigned.args = {
    value: Currency.USD,
    readonly: true,
};
ReadonlyRedesigned.decorators = [AlignDecorator('center'), NewDesignDecorator];

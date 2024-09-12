import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CurrencySelect } from './CurrencySelect';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { AlignCenterDecorator } from '@/shared/config/storybook/AlignDecorator/AlignCenterDecorator';
import { Currency } from '../../model/types/currency';

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
Normal.decorators = [AlignCenterDecorator];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [AlignCenterDecorator, NewDesignDecorator];

export const Readonly = Template.bind({});
Readonly.args = {
    value: Currency.USD,
    readonly: true,
};
Readonly.decorators = [AlignCenterDecorator];

export const ReadonlyRedesigned = Template.bind({});
ReadonlyRedesigned.args = {
    value: Currency.USD,
    readonly: true,
};
ReadonlyRedesigned.decorators = [AlignCenterDecorator, NewDesignDecorator];

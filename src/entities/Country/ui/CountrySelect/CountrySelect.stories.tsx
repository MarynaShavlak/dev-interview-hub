import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CountrySelect } from './CountrySelect';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { AlignCenterDecorator } from '@/shared/config/storybook/AlignDecorator/AlignCenterDecorator';
import { Country } from '../../model/types/country';

export default {
    title: 'entities/Country/CountrySelect',
    component: CountrySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (args) => {
    const { value } = args;
    const [selectedCountry, setSelectedCountry] = useState<Country>(
        value || Country.Ukraine,
    );

    return (
        <CountrySelect
            {...args}
            value={selectedCountry}
            onChange={(newValue) => setSelectedCountry(newValue)}
        />
    );
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [AlignCenterDecorator];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [AlignDecorator('center'), NewDesignDecorator];

export const Readonly = Template.bind({});
Readonly.args = {
    value: Country.Poland,
    readonly: true,
};
Readonly.decorators = [AlignCenterDecorator];

export const ReadonlyRedesigned = Template.bind({});
ReadonlyRedesigned.args = {
    value: Country.Poland,
    readonly: true,
};
ReadonlyRedesigned.decorators = [AlignDecorator('center'), NewDesignDecorator];

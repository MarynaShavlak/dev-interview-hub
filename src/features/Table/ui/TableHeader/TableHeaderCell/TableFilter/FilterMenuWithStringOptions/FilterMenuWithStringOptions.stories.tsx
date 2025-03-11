import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FilterMenuWithStringOptions } from './FilterMenuWithStringOptions';
import { mockSetColumnFilters, stringOptions } from '../../../../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Table/Header/FilterMenuWithStringOptions',
    component: FilterMenuWithStringOptions,
} as ComponentMeta<typeof FilterMenuWithStringOptions>;

const Template: ComponentStory<typeof FilterMenuWithStringOptions> = (args) => (
    <FilterMenuWithStringOptions {...args} />
);
const defaultArgs = {
    allOptions: stringOptions,
    filteredOptions: [],
    filterCategory: 'status',
    setColumnFilters: mockSetColumnFilters,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithActiveFilters = Template.bind({});
WithActiveFilters.args = {
    ...defaultArgs,
    filteredOptions: [stringOptions[0], stringOptions[2]],
};

export const Empty = Template.bind({});
Empty.args = {
    ...defaultArgs,
    allOptions: [],
    filteredOptions: [],
};

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = defaultArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];

export const WithActiveFiltersRedesigned = Template.bind({});
WithActiveFiltersRedesigned.args = {
    ...defaultArgs,
    filteredOptions: [stringOptions[0], stringOptions[2]],
};
WithActiveFiltersRedesigned.decorators = [NewDesignDecorator];

export const EmptyRedesigned = Template.bind({});
EmptyRedesigned.args = {
    ...defaultArgs,
    allOptions: [],
    filteredOptions: [],
};
EmptyRedesigned.decorators = [NewDesignDecorator];

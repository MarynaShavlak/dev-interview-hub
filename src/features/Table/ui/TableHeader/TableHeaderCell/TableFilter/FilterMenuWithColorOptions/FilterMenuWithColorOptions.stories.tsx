import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FilterMenuWithColorOptions } from './FilterMenuWithColorOptions';
import { colorOptions, mockSetColumnFilters } from '../../../../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Table/Header/FilterMenuWithColorOptions',
    component: FilterMenuWithColorOptions,
} as ComponentMeta<typeof FilterMenuWithColorOptions>;

const Template: ComponentStory<typeof FilterMenuWithColorOptions> = (args) => (
    <FilterMenuWithColorOptions {...args} />
);
const defaultArgs = {
    allOptions: colorOptions,
    filteredOptions: [],
    filterCategory: 'status',
    setColumnFilters: mockSetColumnFilters,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithActiveFilters = Template.bind({});
WithActiveFilters.args = {
    ...defaultArgs,
    filteredOptions: [colorOptions[0], colorOptions[2]],
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
    filteredOptions: [colorOptions[0], colorOptions[2]],
};
WithActiveFiltersRedesigned.decorators = [NewDesignDecorator];

export const EmptyRedesigned = Template.bind({});
EmptyRedesigned.args = {
    ...defaultArgs,
    allOptions: [],
    filteredOptions: [],
};
EmptyRedesigned.decorators = [NewDesignDecorator];

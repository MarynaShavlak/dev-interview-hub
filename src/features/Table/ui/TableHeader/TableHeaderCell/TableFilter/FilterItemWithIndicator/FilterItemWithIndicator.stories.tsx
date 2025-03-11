import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FilterItemWithIndicator } from './FilterItemWithIndicator';
import { colorOptions, mockSetColumnFilters } from '../../../../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Table/Header/TableFilter/FilterItemWithIndicator',
    component: FilterItemWithIndicator,
} as ComponentMeta<typeof FilterItemWithIndicator>;

const Template: ComponentStory<typeof FilterItemWithIndicator> = (args) => (
    <FilterItemWithIndicator {...args} />
);
const defaultArgs = {
    option: colorOptions[0],
    filterCategory: 'status',
    isActive: false,
    setColumnFilters: mockSetColumnFilters,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = defaultArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];

export const Active = Template.bind({});
Active.args = {
    ...defaultArgs,
    isActive: true,
};

export const ActiveRedesigned = Template.bind({});
ActiveRedesigned.args = {
    ...defaultArgs,
    isActive: true,
};
ActiveRedesigned.decorators = [NewDesignDecorator];

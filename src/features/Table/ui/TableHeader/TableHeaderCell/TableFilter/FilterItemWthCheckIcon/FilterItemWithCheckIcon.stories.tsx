import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FilterItemWithCheckIcon } from './FilterItemWithCheckIcon';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { mockSetColumnFilters } from '../../../../../testing';

export default {
    title: 'features/Table/Header/Cell/TableFilter/FilterItemWithCheckIcon',
    component: FilterItemWithCheckIcon,
} as ComponentMeta<typeof FilterItemWithCheckIcon>;

const Template: ComponentStory<typeof FilterItemWithCheckIcon> = (args) => (
    <FilterItemWithCheckIcon {...args} />
);

const defaultArgs = {
    option: 'Category A',
    filterCategory: 'category',
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

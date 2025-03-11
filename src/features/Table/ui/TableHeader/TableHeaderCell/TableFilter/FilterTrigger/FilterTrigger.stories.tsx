import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FilterTrigger } from './FilterTrigger';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Table/Header/Cell/TableFilter/FilterTrigger',
    component: FilterTrigger,
    argTypes: {
        isFilterActive: { control: 'boolean' },
    },
} as ComponentMeta<typeof FilterTrigger>;

const Template: ComponentStory<typeof FilterTrigger> = (args) => (
    <FilterTrigger {...args} />
);

export const Inactive = Template.bind({});
Inactive.args = {
    isFilterActive: false,
};

export const Active = Template.bind({});
Active.args = {
    isFilterActive: true,
};

export const InactiveRedesigned = Template.bind({});
InactiveRedesigned.args = { isFilterActive: false };
InactiveRedesigned.decorators = [NewDesignDecorator];

export const ActiveRedesigned = Template.bind({});
ActiveRedesigned.args = { isFilterActive: true };
ActiveRedesigned.decorators = [NewDesignDecorator];

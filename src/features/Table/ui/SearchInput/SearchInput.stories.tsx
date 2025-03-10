import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchInput } from './SearchInput';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Table/SearchInput',
    component: SearchInput,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => (
    <SearchInput {...args} />
);

const defaultArgs = {
    globalFilter: '',
    setGlobalFilter: (value: string) => console.log(value),
};
const withText = {
    globalFilter: 'example',
    setGlobalFilter: (value: string) => console.log(value),
};

export const EmptyFilter = Template.bind({});
EmptyFilter.args = defaultArgs;

export const EmptyFilterRedesigned = Template.bind({});
EmptyFilterRedesigned.args = defaultArgs;
EmptyFilterRedesigned.decorators = [NewDesignDecorator];

export const WithFilterText = Template.bind({});
WithFilterText.args = withText;

export const WithFilterTextRedesigned = Template.bind({});
WithFilterTextRedesigned.args = withText;
WithFilterTextRedesigned.decorators = [NewDesignDecorator];

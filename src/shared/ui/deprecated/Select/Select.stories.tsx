import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select } from './Select';

export default {
    title: 'shared/deprecated/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    label: 'Select an option',
    options: [
        { value: '1', content: 'Option 1' },
        { value: '2', content: 'Option 2' },
    ],
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
    label: 'Select an option',
    value: '2',
    options: [
        { value: '1', content: 'Option 1' },
        { value: '2', content: 'Option 2' },
    ],
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Select an option',
    readonly: true,
    options: [
        { value: '1', content: 'Option 1' },
        { value: '2', content: 'Option 2' },
    ],
};

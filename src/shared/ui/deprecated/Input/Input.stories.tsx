import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from './Input';

export default {
    title: 'shared/deprecated/Input',
    component: Input,
    argTypes: {
        backgroundColor: { control: 'color' },
        value: { control: 'text' },
        autofocus: { control: 'boolean' },
        readonly: { control: 'boolean' },
        digitsOnly: { control: 'boolean' },
    },
    args: {
        placeholder: 'Type...',
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    value: '123123',
};

export const Autocomplete = Template.bind({});
Autocomplete.args = {
    value: 'Autofocus enabled',
    autofocus: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    value: 'Cannot change this',
    readonly: true,
};

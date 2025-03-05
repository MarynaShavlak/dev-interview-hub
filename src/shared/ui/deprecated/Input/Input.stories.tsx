import React, { useState } from 'react';
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

const Template: ComponentStory<typeof Input> = (args) => {
    const { value: argsValue } = args;
    const [value, setValue] = useState(argsValue || '');

    return <Input {...args} value={value} onChange={setValue} />;
};

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
export const DigitsOnly = Template.bind({});
DigitsOnly.args = {
    digitsOnly: true,
};

export const WithBorder = Template.bind({});
WithBorder.args = {
    value: 'Border enabled',
    withBorder: true,
};

export const MaxLengthIndicator = Template.bind({});
MaxLengthIndicator.args = {
    value: 'Limited text',
    maxLengthIndicator: true,
    validations: { maxLength: 10 },
};

export const EmptyPlaceholder = Template.bind({});
EmptyPlaceholder.args = {
    placeholder: '',
    value: 'Input with no placeholder',
};

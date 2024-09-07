import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './Input';
import { Text } from '../Text';
import { Icon } from '../Icon';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Input',
    component: Input,
    argTypes: {
        onChange: { action: 'changed' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    placeholder: 'Enter text',
    size: 'm',
};

export const Labeled = Template.bind({});
Labeled.args = {
    label: 'Username',
    placeholder: 'Enter your username',
    size: 'm',
};

export const WithLeftAddon = Template.bind({});
WithLeftAddon.args = {
    placeholder: 'Search...',
    addonLeft: <Icon Svg={SearchIcon} clickable={false} />,
    size: 'm',
};

export const WithRightAddon = Template.bind({});
WithRightAddon.args = {
    placeholder: 'Enter your password',
    addonRight: <Text text="Password" />,
    size: 'm',
};

export const WithAddons = Template.bind({});
WithAddons.args = {
    placeholder: 'Search...',
    addonLeft: <Icon Svg={SearchIcon} clickable={false} />,
    addonRight: <Text text="Search" />,
    size: 'm',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    placeholder: 'Cannot edit',
    value: 'Read-only text',
    readonly: true,
    size: 'm',
};

export const Autofocus = Template.bind({});
Autofocus.args = {
    placeholder: 'Autofocused',
    autofocus: true,
    size: 'm',
};

export const Large = Template.bind({});
Large.args = {
    placeholder: 'Large input',
    size: 'l',
};

export const Small = Template.bind({});
Small.args = {
    placeholder: 'Small input',
    size: 's',
};

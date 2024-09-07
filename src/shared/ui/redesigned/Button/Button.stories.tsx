import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
        variant: {
            control: 'select',
            options: ['clear', 'outline', 'filled', 'save', 'cancel'],
        },
        size: {
            control: 'select',
            options: ['s', 'm', 'l', 'xl'],
        },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Outline = Template.bind({});
Outline.args = {
    children: 'Outline Button',
    variant: 'outline',
};

export const Filled = Template.bind({});
Filled.args = {
    children: 'Filled Button',
    variant: 'filled',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Clear Button',
    variant: 'clear',
};

export const Save = Template.bind({});
Save.args = {
    children: 'Save Button',
    variant: 'save',
};

export const Cancel = Template.bind({});
Cancel.args = {
    children: 'Cancel Button',
    variant: 'cancel',
};

export const Small = Template.bind({});
Small.args = {
    children: 'Small Button',
    size: 's',
};

export const Large = Template.bind({});
Large.args = {
    children: 'Large Button',
    size: 'l',
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
    children: 'Extra Large Button',
    size: 'xl',
};

export const Square = Template.bind({});
Square.args = {
    children: 'S',
    square: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'Disabled Button',
    disabled: true,
};

export const MaxWidth = Template.bind({});
MaxWidth.args = {
    children: 'Max Width Button',
    max: true,
};

export const WithAddonLeft = Template.bind({});
WithAddonLeft.args = {
    children: 'With Left Addon',
    addonLeft: <span>🔍</span>,
};

export const WithAddonRight = Template.bind({});
WithAddonRight.args = {
    children: 'With Right Addon',
    addonRight: <span>⚙</span>,
};

export const WithBothAddons = Template.bind({});
WithBothAddons.args = {
    children: 'With Addons',
    addonLeft: <span>🔍</span>,
    addonRight: <span>⚙</span>,
};

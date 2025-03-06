import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card } from './Card';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Card',
    component: Card,
    argTypes: {
        variant: {
            control: 'select',
            options: ['normal', 'outlined', 'light'],
        },
        padding: {
            control: 'select',
            options: ['0', '8', '16', '24'],
        },
        border: {
            control: 'select',
            options: ['classic', 'round', 'partial'],
        },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    children: 'Normal Card',
    variant: 'normal',
};

export const Outlined = Template.bind({});
Outlined.args = {
    children: 'Outlined Card',
    variant: 'outlined',
};

export const Light = Template.bind({});
Light.args = {
    children: 'Light Card',
    variant: 'light',
};

export const NoPadding = Template.bind({});
NoPadding.args = {
    children: 'Card with No Padding',
    padding: '0',
    variant: 'outlined',
};

export const Padding8 = Template.bind({});
Padding8.args = {
    children: 'Card with 8 Padding',
    padding: '8',
    variant: 'outlined',
};

export const Padding16 = Template.bind({});
Padding16.args = {
    children: 'Card with 16 Padding',
    padding: '16',
    variant: 'outlined',
};

export const Padding24 = Template.bind({});
Padding24.args = {
    children: 'Card with 24 Padding',
    padding: '24',
    variant: 'outlined',
};

export const ClassicBorder = Template.bind({});
ClassicBorder.args = {
    children: 'Card with Classic Border',
    border: 'classic',
    variant: 'outlined',
};

export const RoundBorder = Template.bind({});
RoundBorder.args = {
    children: 'Card with Round Border',
    border: 'round',
    variant: 'outlined',
};

export const PartialBorder = Template.bind({});
PartialBorder.args = {
    children: 'Card with Partial Border',
    border: 'partial',
    variant: 'outlined',
};

export const MaxWidth = Template.bind({});
MaxWidth.args = {
    children: 'Card with Max Width',
    max: true,
    variant: 'outlined',
};

export const FullHeight = Template.bind({});
FullHeight.args = {
    children: 'Card with Full Height',
    fullHeight: true,
    variant: 'outlined',
};

export const CustomCard = Template.bind({});
CustomCard.args = {
    children: 'Custom Card with All Options',
    variant: 'outlined',
    padding: '16',
    border: 'round',
    max: true,
    fullHeight: true,
};

export const CustomPadding = Template.bind({});
CustomPadding.args = {
    children: 'Card with Custom Padding',
    variant: 'outlined',
    customPadding: '20px', // Custom padding applied here
};

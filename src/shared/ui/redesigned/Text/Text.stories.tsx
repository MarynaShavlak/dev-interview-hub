import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from './Text';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Text',
    component: Text,
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'error', 'accent'],
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right'],
        },
        size: {
            control: 'select',
            options: ['s', 'm', 'l'],
        },
        bold: {
            control: 'boolean',
        },
        decorators: [NewDesignDecorator],
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Default Title',
    text: 'This is the default text component with primary variant and left alignment.',
};

export const PrimaryVariant = Template.bind({});
PrimaryVariant.args = {
    title: 'Primary Variant',
    text: 'This is the primary variant with medium size and left alignment.',
    variant: 'primary',
    size: 'm',
};

export const ErrorVariant = Template.bind({});
ErrorVariant.args = {
    title: 'Error Variant',
    text: 'An error occurred, showing the error variant.',
    variant: 'error',
    size: 'm',
};

export const AccentVariant = Template.bind({});
AccentVariant.args = {
    title: 'Accent Variant',
    text: 'This is the accent variant with bold text.',
    variant: 'accent',
    size: 'm',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
    title: 'Small Size Title',
    text: 'This is a small-sized text component.',
    size: 's',
};

export const MediumSize = Template.bind({});
MediumSize.args = {
    title: 'Medium Size Title',
    text: 'This is a medium-sized text component.',
    size: 'm',
};

export const LargeSize = Template.bind({});
LargeSize.args = {
    title: 'Large Size Title',
    text: 'This is a large-sized text component.',
    size: 'l',
};

export const LeftAligned = Template.bind({});
LeftAligned.args = {
    title: 'Left Aligned Title',
    text: 'This text is aligned to the left.',
    align: 'left',
};

export const CenterAligned = Template.bind({});
CenterAligned.args = {
    title: 'Center Aligned Title',
    text: 'This text is centered.',
    align: 'center',
};

export const RightAligned = Template.bind({});
RightAligned.args = {
    title: 'Right Aligned Title',
    text: 'This text is aligned to the right.',
    align: 'right',
};

export const BoldText = Template.bind({});
BoldText.args = {
    title: 'Bold Title',
    text: 'This text is bold.',
    bold: true,
};

export const NoTitle = Template.bind({});
NoTitle.args = {
    text: 'This text has no title.',
};

export const NoText = Template.bind({});
NoText.args = {
    title: 'This title has no text.',
};

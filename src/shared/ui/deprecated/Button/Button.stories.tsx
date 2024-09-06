import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';

export default {
    title: 'shared/deprecated/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
        size: {
            control: { type: 'select', options: Object.values(ButtonSize) },
        },
        theme: {
            control: { type: 'select', options: Object.values(ButtonTheme) },
        },
        disabled: { control: 'boolean' },
        square: { control: 'boolean' },
        max: { control: 'boolean' },
    },
    args: {
        children: 'Button Text',
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

export const Clear = Template.bind({});
Clear.args = {
    theme: ButtonTheme.CLEAR,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
    theme: ButtonTheme.CLEAR_INVERTED,
};

export const Outline = Template.bind({});
Outline.args = {
    theme: ButtonTheme.OUTLINE,
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.L,
};

export const OutlineSizeXl = Template.bind({});
OutlineSizeXl.args = {
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.XL,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    theme: ButtonTheme.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundTheme = Template.bind({});
BackgroundTheme.args = {
    theme: ButtonTheme.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    theme: ButtonTheme.BACKGROUND_INVERTED,
};

export const Square = Template.bind({});
Square.args = {
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.L,
};

export const SquareSizeXl = Template.bind({});
SquareSizeXl.args = {
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.XL,
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: '>',
    theme: ButtonTheme.OUTLINE,
    disabled: true,
};

export const MaxWidth = Template.bind({});
MaxWidth.args = {
    children: 'Max Width Button',
    max: true,
    theme: ButtonTheme.OUTLINE,
};

export const MaxWidthDisabled = Template.bind({});
MaxWidthDisabled.args = {
    children: 'Max Width Disabled',
    theme: ButtonTheme.OUTLINE,
    max: true,
    disabled: true,
};

export const LoadingState = Template.bind({});
LoadingState.args = {
    children: 'Loading...',
    theme: ButtonTheme.OUTLINE,
    disabled: true,
};

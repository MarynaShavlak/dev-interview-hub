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

export const Background = Template.bind({});
Background.args = {
    theme: ButtonTheme.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    theme: ButtonTheme.BACKGROUND_INVERTED,
};

export const OutlineRed = Template.bind({});
OutlineRed.args = {
    theme: ButtonTheme.OUTLINE_RED,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    theme: ButtonTheme.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Link = Template.bind({});
Link.args = {
    theme: ButtonTheme.LINK,
};

export const SizeSmall = Template.bind({});
SizeSmall.args = {
    size: ButtonSize.S,
};

export const SizeMedium = Template.bind({});
SizeMedium.args = {
    size: ButtonSize.M,
};

export const SizeLarge = Template.bind({});
SizeLarge.args = {
    size: ButtonSize.L,
};

export const SizeExtraLarge = Template.bind({});
SizeExtraLarge.args = {
    size: ButtonSize.XL,
};

export const Square = Template.bind({});
Square.args = {
    children: '>',
    square: true,
};

export const SquareLarge = Template.bind({});
SquareLarge.args = {
    children: '>',
    square: true,
    size: ButtonSize.L,
};

export const SquareExtraLarge = Template.bind({});
SquareExtraLarge.args = {
    children: '>',
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

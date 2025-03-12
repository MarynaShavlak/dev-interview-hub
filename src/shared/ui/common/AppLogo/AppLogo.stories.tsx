import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AppLogo } from './AppLogo';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/common/AppLogo',
    component: AppLogo,
    argTypes: {
        size: { control: { type: 'number' } },
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppLogo>;

const Template: ComponentStory<typeof AppLogo> = (args) => (
    <AppLogo {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};

export const LargeLogo = Template.bind({});
LargeLogo.args = {
    size: 100,
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator];

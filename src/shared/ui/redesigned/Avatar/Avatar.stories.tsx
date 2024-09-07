import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Avatar } from './Avatar';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Avatar',
    component: Avatar,
    argTypes: {
        size: { control: 'number' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
    src: 'https://via.placeholder.com/100',
    alt: 'User Avatar',
    size: 100,
};

export const WithUserName = Template.bind({});
WithUserName.args = {
    src: 'https://via.placeholder.com/150',
    alt: 'User Avatar',
    size: 30,
    userName: 'Name of user',
};

export const SmallAvatar = Template.bind({});
SmallAvatar.args = {
    src: 'https://via.placeholder.com/150',
    alt: 'Small Avatar',
    size: 50,
};

export const LargeAvatar = Template.bind({});
LargeAvatar.args = {
    src: 'https://via.placeholder.com/150',
    alt: 'Large Avatar',
    size: 150,
};

export const WithErrorFallback = Template.bind({});
WithErrorFallback.args = {
    src: '',
    alt: 'Fallback Avatar',
    size: 100,
};

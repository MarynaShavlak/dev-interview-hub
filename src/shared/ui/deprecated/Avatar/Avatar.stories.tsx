import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Avatar } from './Avatar';
import AvatarImg from '../../../assets/tests/storybook.jpg';

export default {
    title: 'shared/deprecated/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
        size: { control: 'number' },
        fallbackInverted: { control: 'boolean' },
    },
    args: {
        alt: 'User avatar',
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    size: 150,
    src: AvatarImg,
};

export const Small = Template.bind({});
Small.args = {
    size: 50,
    src: AvatarImg,
};

export const NoImage = Template.bind({});
NoImage.args = {
    size: 100,
    src: undefined,
};

export const FallbackInverted = Template.bind({});
FallbackInverted.args = {
    size: 100,
    src: undefined,
    fallbackInverted: true,
};

export const CustomSize = Template.bind({});
CustomSize.args = {
    size: 200,
    src: AvatarImg,
};

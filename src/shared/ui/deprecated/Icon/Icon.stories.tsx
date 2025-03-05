import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon } from './Icon';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import UserIcon from '@/shared/assets/icons/user-filled.svg';

export default {
    title: 'shared/deprecated/Icon',
    component: Icon,
    argTypes: {
        className: { control: 'text' },
        inverted: { control: 'boolean' },
    },
    args: {
        Svg: CopyIcon,
    },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Inverted = Template.bind({});
Inverted.args = {
    inverted: true,
};

export const UserIconExample = Template.bind({});
UserIconExample.args = {
    Svg: UserIcon,
    width: 24,
    height: 24,
};

export const CustomSize = Template.bind({});
CustomSize.args = {
    style: { width: '40px', height: '40px' },
};

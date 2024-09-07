import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Icon } from './Icon';
import UserIcon from '@/shared/assets/icons/user-filled.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Icon',
    component: Icon,
    argTypes: {
        onClick: { action: 'clicked' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const NonClickable = Template.bind({});
NonClickable.args = {
    Svg: UserIcon,
    width: 24,
    height: 24,
    clickable: false,
};

export const Clickable = Template.bind({});
Clickable.args = {
    Svg: NotificationIcon,
    width: 24,
    height: 24,
    clickable: true,
    onClick: () => alert('Icon clicked'),
};

export const LargeClickable = Template.bind({});
LargeClickable.args = {
    Svg: UserIcon,
    width: 64,
    height: 64,
    clickable: true,
    onClick: () => alert('Large icon clicked'),
};

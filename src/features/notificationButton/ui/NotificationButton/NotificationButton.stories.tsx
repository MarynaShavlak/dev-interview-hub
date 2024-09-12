import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NotificationButton } from './NotificationButton';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { AlignRightDecorator } from '@/shared/config/storybook/AlignDecorator/AlignCenterDecorator';
import { dataSuccessRequest } from '@/entities/Notification/testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

// Default export for Storybook
export default {
    title: 'features/NotificationButton',
    component: NotificationButton,
    decorators: [StoreDecorator({})],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => (
    <NotificationButton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.parameters = {
    mockData: dataSuccessRequest,
};
Normal.decorators = [AlignRightDecorator];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.parameters = {
    mockData: dataSuccessRequest,
};
NormalRedesigned.decorators = [AlignRightDecorator, NewDesignDecorator];

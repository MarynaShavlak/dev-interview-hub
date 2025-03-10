import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationButton } from './NotificationButton';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { testUserData } from '@/entities/User/testing';
import { User } from '@/entities/User';
import { AlignDecorator } from '@/shared/config/storybook/AlignDecorator/AlignDecorator';

export default {
    title: 'features/NotificationButton',
    component: NotificationButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => (
    <NotificationButton {...args} />
);

const createStory = (user: User, useNewDesign = false) => {
    const story = Template.bind({});
    story.args = {};

    story.decorators = [
        AlignDecorator('right'),
        StoreDecorator({ user: { authData: user } }),
    ];
    if (useNewDesign) story.decorators.push(NewDesignDecorator);
    return story;
};

export const Default = createStory(testUserData);
export const DefaultRedesigned = createStory(testUserData, true);

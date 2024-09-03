import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotificationList } from './NotificationList';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => (
    <NotificationList {...args} />
);

const dataSuccess = [
    {
        url: `${__API__}/notifications`,
        method: 'GET',
        status: 200,
        response: [
            {
                id: '1',
                title: 'Сповіщення 1',
                description: 'Текст сповіщення 1',
            },
            {
                id: '2',
                title: 'Сповіщення 2',
                description: 'Текст сповіщення 2',
            },
            {
                id: '3',
                title: 'Сповіщення 1',
                description: 'Текст сповіщення 3',
            },
        ],
    },
];

export const Normal = Template.bind({});
Normal.args = {};
Normal.parameters = {
    mockData: dataSuccess,
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.parameters = {
    mockData: dataSuccess,
};
NormalRedesigned.decorators = [NewDesignDecorator];

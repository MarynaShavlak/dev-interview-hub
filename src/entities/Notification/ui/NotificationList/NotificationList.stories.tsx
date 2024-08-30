
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { NotificationList } from './NotificationList';

export default {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [ StoreDecorator({})],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => (
    <NotificationList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.parameters = {
    mockData: [
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
    ],
};

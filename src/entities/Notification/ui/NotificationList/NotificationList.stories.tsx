import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationList } from './NotificationList';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

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

const normalArgs = {
    userId: '2CuQOzOQ9YeU7bFzncJh8YwGZGI2',
};

export const Default = Template.bind({});
Default.args = normalArgs;
// Default.parameters = {
//     mockData: [
//         testGeneralNotification,
//         testCommentPersonalNotification,
//         testRatingPersonalNotification,
//         testRatingWithFeedbackPersonalNotification,
//     ],
// };

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = normalArgs;
// DefaultRedesigned.parameters = {
//     mockData: dataSuccessRequest,
// };
DefaultRedesigned.decorators = [NewDesignDecorator];

// import React from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
// import { NotificationList } from './NotificationList';
// import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
// import { dataSuccessRequest } from '../../testing';
//
// export default {
//     title: 'entities/Notification/NotificationList',
//     component: NotificationList,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
//     decorators: [StoreDecorator({})],
// } as ComponentMeta<typeof NotificationList>;
//
// const Template: ComponentStory<typeof NotificationList> = (args) => (
//     <NotificationList {...args} />
// );
//
// export const Normal = Template.bind({});
// Normal.args = {};
// Normal.parameters = {
//     mockData: dataSuccessRequest,
// };
//
// export const NormalRedesigned = Template.bind({});
// NormalRedesigned.args = {};
// NormalRedesigned.parameters = {
//     mockData: dataSuccessRequest,
// };
// NormalRedesigned.decorators = [NewDesignDecorator];

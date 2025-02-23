export {};

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

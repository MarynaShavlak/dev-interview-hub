export {};
// import React from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
//
// import { NotificationItem } from './NotificationItem';
// import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
//
// export default {
//     title: 'entities/Notification/NotificationItem',
//     component: NotificationItem,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
//     decorators: [StoreDecorator({})],
// } as ComponentMeta<typeof NotificationItem>;
//
// const Template: ComponentStory<typeof NotificationItem> = (args) => (
//     <NotificationItem {...args} />
// );
// const normalArgs = {
//     item: {
//         id: '1',
//         title: 'Сповіщення 1',
//         description: 'Текст сповіщення 1',
//     },
// };
//
// export const Normal = Template.bind({});
// Normal.args = normalArgs;
//
// export const NormalRedesigned = Template.bind({});
// NormalRedesigned.args = normalArgs;
// NormalRedesigned.decorators = [NewDesignDecorator];

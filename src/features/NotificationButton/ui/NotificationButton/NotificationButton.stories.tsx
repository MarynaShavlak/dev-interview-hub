export {};

// import React from 'react';
// import { ComponentMeta, ComponentStory } from '@storybook/react';
// import { NotificationButton } from './NotificationButton';
// import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
// import { dataSuccessRequest } from '@/entities/Notification/testing';
// import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
// import { AlignDecorator } from '@/shared/config/storybook/AlignDecorator/AlignDecorator';
//
// // Default export for Storybook
// export default {
//     title: 'features/NotificationButton',
//     component: NotificationButton,
//     decorators: [StoreDecorator({})],
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as ComponentMeta<typeof NotificationButton>;
//
// const Template: ComponentStory<typeof NotificationButton> = (args) => (
//     <NotificationButton {...args} />
// );
//
// export const Normal = Template.bind({});
// Normal.args = {};
// Normal.parameters = {
//     mockData: dataSuccessRequest,
// };
// Normal.decorators = [AlignDecorator('right')];
//
// export const NormalRedesigned = Template.bind({});
// NormalRedesigned.args = {};
// NormalRedesigned.parameters = {
//     mockData: dataSuccessRequest,
// };
// NormalRedesigned.decorators = [AlignDecorator('right'), NewDesignDecorator];

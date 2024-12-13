export {};
// import React from 'react';
// import { ComponentMeta, ComponentStory } from '@storybook/react';
// import { ArticleAdditionalInfo } from './ArticleAdditionalInfo';
// import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
// import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
// import { testUserData } from '@/entities/User/testing';
// import { withI18nDecorator } from '@/shared/config/storybook/withI18nDecorator/withI18nDecorator';
//
// export default {
//     title: 'widgets/ArticleAdditionalInfo',
//     component: ArticleAdditionalInfo,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
//     decorators: [StoreDecorator({}), NewDesignDecorator, withI18nDecorator],
// } as ComponentMeta<typeof ArticleAdditionalInfo>;
//
// const Template: ComponentStory<typeof ArticleAdditionalInfo> = (args) => (
//     <ArticleAdditionalInfo {...args} />
// );
//
// export const Default = Template.bind({});
// Default.args = {
//     author: testUserData,
//     createdAt: '2024-09-10',
//     views: 256,
// };
//
// export const ManyViews = Template.bind({});
// ManyViews.args = {
//     author: testUserData,
//     createdAt: '2023-03-22',
//     views: 1000000,
// };
//
// export const OneView = Template.bind({});
// OneView.args = {
//     author: testUserData,
//     createdAt: '2023-03-22',
//     views: 1,
// };
//
// export const TwoViews = Template.bind({});
// TwoViews.args = {
//     author: testUserData,
//     createdAt: '2023-03-22',
//     views: 2,
// };

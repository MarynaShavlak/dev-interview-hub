export {};

// import { ComponentMeta, ComponentStory } from '@storybook/react';
// import React from 'react';
// import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
//
// import { ArticleView } from '@/entities/Article';
// import { ArticleInfiniteList } from './ArticleInfiniteList';
// import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
// import { articlesNormalizedData } from '@/entities/Article/testing';
//
// export default {
//     title: 'pages/ArticlesPage/ArticleInfiniteList',
//     component: ArticleInfiniteList,
//     argTypes: {
//         onInfiniteScroll: { action: 'onInfiniteScroll' },
//     },
// } as ComponentMeta<typeof ArticleInfiniteList>;
//
// const Template: ComponentStory<typeof ArticleInfiniteList> = (args) => (
//     <ArticleInfiniteList {...args} />
// );
//
// const loadingState = {
//     isLoading: true,
//     ids: [],
//     entities: {},
// };
//
// const errorState = {
//     isLoading: false,
//     ids: [],
//     entities: {},
//     error: 'Failed to load articles',
// };
//
// export const NormalGrid = Template.bind({});
// NormalGrid.args = {};
// NormalGrid.decorators = [
//     StoreDecorator({
//         articlesPage: {
//             ...articlesNormalizedData,
//             view: ArticleView.GRID,
//             isLoading: false,
//         },
//     }),
// ];
//
// export const NormalList = Template.bind({});
// NormalList.args = {};
// NormalList.decorators = [
//     StoreDecorator({
//         articlesPage: {
//             ...articlesNormalizedData,
//             view: ArticleView.LIST,
//             isLoading: false,
//         },
//     }),
// ];
//
// export const LoadingGrid = Template.bind({});
// LoadingGrid.args = {};
// LoadingGrid.decorators = [
//     StoreDecorator({
//         articlesPage: {
//             ...loadingState,
//             view: ArticleView.GRID,
//         },
//     }),
// ];
//
// export const LoadingList = Template.bind({});
// LoadingList.args = {};
// LoadingList.decorators = [
//     StoreDecorator({
//         articlesPage: {
//             ...loadingState,
//             view: ArticleView.LIST,
//         },
//     }),
// ];
//
// export const Error = Template.bind({});
// Error.args = {};
// Error.decorators = [
//     StoreDecorator({
//         articlesPage: {
//             ...errorState,
//             view: ArticleView.GRID,
//         },
//     }),
// ];
//
// //
// export const NormalGridRedesigned = Template.bind({});
// NormalGridRedesigned.args = {};
// NormalGridRedesigned.decorators = [
//     StoreDecorator({
//         articlesPage: {
//             ...articlesNormalizedData,
//             view: ArticleView.GRID,
//             isLoading: false,
//         },
//     }),
//     NewDesignDecorator,
// ];
//
// export const NormalListRedesigned = Template.bind({});
// NormalListRedesigned.args = {};
// NormalListRedesigned.decorators = [
//     StoreDecorator({
//         articlesPage: {
//             ...articlesNormalizedData,
//             view: ArticleView.LIST,
//             isLoading: false,
//         },
//     }),
//     NewDesignDecorator,
// ];
//
// export const LoadingGridRedesigned = Template.bind({});
// LoadingGridRedesigned.args = {};
// LoadingGridRedesigned.decorators = [
//     StoreDecorator({
//         articlesPage: {
//             ...loadingState,
//             view: ArticleView.GRID,
//         },
//     }),
//     NewDesignDecorator,
// ];
//
// export const LoadingListRedesigned = Template.bind({});
// LoadingListRedesigned.args = {};
// LoadingListRedesigned.decorators = [
//     StoreDecorator({
//         articlesPage: {
//             ...loadingState,
//             view: ArticleView.LIST,
//         },
//     }),
//     NewDesignDecorator,
// ];
//
// export const ErrorRedesigned = Template.bind({});
// ErrorRedesigned.args = {};
// ErrorRedesigned.decorators = [
//     StoreDecorator({
//         articlesPage: {
//             ...errorState,
//             view: ArticleView.GRID,
//         },
//     }),
//     NewDesignDecorator,
// ];

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleDetailsPageContainer } from './ArticleDetailsPageContainer';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { testArticleData } from '@/entities/Article/testing';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPageContainer',
    component: ArticleDetailsPageContainer,
} as ComponentMeta<typeof ArticleDetailsPageContainer>;

const Template: ComponentStory<typeof ArticleDetailsPageContainer> = (args) => (
    <ArticleDetailsPageContainer />
);
export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
    StoreDecorator({
        articleDetails: {
            data: testArticleData,
        },
    }),
];

// export const Loading = Template.bind({});
// Loading.args = {};
// Loading.decorators = [
//     StoreDecorator({
//         article: {
//             details: {
//                 isLoading: true,
//                 data: null,
//                 error: null,
//             },
//         },
//     }),
// ];
//
// export const ErrorState = Template.bind({});
// ErrorState.args = {};
// ErrorState.decorators = [
//     StoreDecorator({
//         article: {
//             details: {
//                 isLoading: false,
//                 data: null,
//                 error: 'Failed to load article details',
//             },
//         },
//     }),
// ];
//
// export const EmptyArticle = Template.bind({});
// EmptyArticle.args = {};
// EmptyArticle.decorators = [
//     StoreDecorator({
//         article: {
//             details: {
//                 isLoading: false,
//                 data: null,
//                 error: null,
//             },
//         },
//     }),
// ];

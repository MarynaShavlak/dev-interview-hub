import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleDetailsPageContainer } from './ArticleDetailsPageContainer';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { testArticleData } from '@/entities/Article/testing';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPageContainer',
    component: ArticleDetailsPageContainer,
    decorators: [
        StoreDecorator({
            user: {
                authData: { id: '123' },
            },
        }),
    ],
} as ComponentMeta<typeof ArticleDetailsPageContainer>;

const Template: ComponentStory<typeof ArticleDetailsPageContainer> = (args) => (
    <ArticleDetailsPageContainer />
);

const mockData = [
    {
        url: 'https://testapi.ua/articles?_limit=3&_expand=user&id_ne=4',
        method: 'GET',
        status: 200,
        response: [
            { ...testArticleData, id: '1', title: 'Mocked Article 1' },
            { ...testArticleData, id: '2', title: 'Mocked Article 2' },
            { ...testArticleData, id: '3', title: 'Mocked Article 3' },
        ],
    },
];

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({
        user: {
            authData: { id: '123' },
        },
        articleDetails: {
            data: testArticleData,
            error: undefined,
        },
    }),
];

Normal.parameters = {
    mockData,
};

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

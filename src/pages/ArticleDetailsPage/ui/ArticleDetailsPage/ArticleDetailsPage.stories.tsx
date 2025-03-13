import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ArticleDetailsPage from './ArticleDetailsPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { withI18nDecorator } from '@/shared/config/storybook/withI18nDecorator/withI18nDecorator';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPage',
    component: ArticleDetailsPage,
    decorators: [StoreDecorator({}), withI18nDecorator],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => (
    <ArticleDetailsPage {...args} />
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
    // Simulate route params since RouterDecorator uses BrowserRouter
    reactRouter: {
        routePath: '/article/:id',
        routeParams: { id: '174' },
    },
};
// Normal.decorators = [
//     StoreDecorator({
//         articleDetails: {
//             data: testArticleData,
//         },
//     }),
// ];

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ArticleDetailsPage from './ArticleDetailsPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { withI18nDecorator } from '@/shared/config/storybook/withI18nDecorator/withI18nDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPage',
    component: ArticleDetailsPage,
    decorators: [StoreDecorator({}), withI18nDecorator],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    parameters: {
        reactRouter: {
            routePath: '/article/:id',
            routeParams: { id: '105' },
        },
    },
    args: {},
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => (
    <ArticleDetailsPage {...args} />
);

export const Default = Template.bind({});
export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.decorators = [NewDesignDecorator];

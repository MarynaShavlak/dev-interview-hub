import { ArticleEditPage } from 'pages/ArticleEditPage';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'pages/ArticleEditPage',
    component: ArticleEditPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleEditPage>;

const Template: ComponentStory<typeof ArticleEditPage> = (args) => <ArticleEditPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleControls } from './ArticleControls';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { withI18nDecorator } from '@/shared/config/storybook/withI18nDecorator/withI18nDecorator';
import { testArticleData } from '@/entities/Article/testing';
import { UserRole } from '@/entities/User';

export default {
    title: 'widgets/ArticleControls',
    component: ArticleControls,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [NewDesignDecorator, withI18nDecorator],
} as ComponentMeta<typeof ArticleControls>;

const Template: ComponentStory<typeof ArticleControls> = (args) => (
    <ArticleControls {...args} />
);

export const Default = Template.bind({});
Default.args = {
    article: testArticleData,
};
Default.decorators = [StoreDecorator({})];

export const ForAdminAndAuthor = Template.bind({});
ForAdminAndAuthor.args = {
    article: testArticleData,
};
ForAdminAndAuthor.decorators = [
    StoreDecorator({ user: { authData: { roles: [UserRole.ADMIN] } } }),
];

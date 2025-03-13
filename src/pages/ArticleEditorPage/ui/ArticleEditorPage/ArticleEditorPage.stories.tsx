import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ArticleEditorPage from './ArticleEditorPage';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ContentSkeleton } from '../ArticleEditorPageContent/ContentSkeleton/ContentSkeleton';

export default {
    title: 'pages/ArticleEditorPage',
    component: ArticleEditorPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticleEditorPage>;

const Template: ComponentStory<typeof ArticleEditorPage> = (args) => (
    <ArticleEditorPage {...args} />
);

export const Default = Template.bind({});

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.decorators = [NewDesignDecorator];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
export const DarkRedesigned = Template.bind({});
DarkRedesigned.decorators = [ThemeDecorator(Theme.DARK), NewDesignDecorator];

export const Orange = Template.bind({});
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];
export const OrangeRedesigned = Template.bind({});
OrangeRedesigned.decorators = [
    ThemeDecorator(Theme.ORANGE),
    NewDesignDecorator,
];

export const Loading = Template.bind({});
Loading.decorators = [() => <ContentSkeleton />];
export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.decorators = [() => <ContentSkeleton />, NewDesignDecorator];

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import HRInterviewAnswerEditorPage from './HRInterviewAnswerEditorPage';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ContentSkeleton } from '../HRInterviewQAEditorPageContent/ContentSkeleton/ContentSkeleton';
import { testArticleData } from '@/entities/Article/testing';

export default {
    title: 'pages/ArticleEditorPage',
    component: HRInterviewAnswerEditorPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof HRInterviewAnswerEditorPage>;

const Template: ComponentStory<typeof HRInterviewAnswerEditorPage> = (args) => (
    <HRInterviewAnswerEditorPage {...args} />
);
const editArticleParameters = {
    reactRouter: {
        routePath: '/article/:id/edit',
        routeParams: { id: '105' },
    },
};

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

export const EditingMode = Template.bind({});
EditingMode.decorators = [
    StoreDecorator({ createArticle: { isEdit: true, form: testArticleData } }),
];
EditingMode.parameters = editArticleParameters;

export const EditingModeRedesigned = Template.bind({});
EditingModeRedesigned.decorators = [
    StoreDecorator({ createArticle: { isEdit: true, form: testArticleData } }),
    NewDesignDecorator,
];
EditingModeRedesigned.parameters = editArticleParameters;

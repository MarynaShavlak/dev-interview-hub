import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ArticleRecommendationsList from './ArticleRecommendationsList';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { EmptyArticleRecommendationsList } from './EmptyArticleRecommendationsList/EmptyArticleRecommendationsList';
import { ArticleRecommendationsListSkeleton } from './ArticleRecommendationsListSkeleton/ArticleRecommendationsListSkeleton';
import { ArticleRecommendationsListError } from './ArticleRecommendationsListError/ArticleRecommendationsListError';

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        StoreDecorator({
            user: {
                authData: { id: '123' },
            },
        }),
    ],
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => (
    <ArticleRecommendationsList {...args} />
);

const normalArgs = { id: '1' };
export const Default = Template.bind({});
Default.args = normalArgs;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = normalArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];

export const WithNoRecommendations = Template.bind({});
WithNoRecommendations.args = { id: '2' };
WithNoRecommendations.decorators = [
    () => (
        <EmptyArticleRecommendationsList
            noRecommendsText="Наразі немає доступних рекомендацій. Будь ласка, перевірте пізніше"
            noRecommendsTitle="Немає доступних рекомендацій"
        />
    ),
    StoreDecorator({}),
];

export const WithNoRecommendationsRedesigned = Template.bind({});
WithNoRecommendationsRedesigned.args = { id: '2' };
WithNoRecommendationsRedesigned.decorators = [
    () => (
        <EmptyArticleRecommendationsList
            noRecommendsText="Наразі немає доступних рекомендацій. Будь ласка, перевірте пізніше"
            noRecommendsTitle="Немає доступних рекомендацій"
        />
    ),
    StoreDecorator({}),
    NewDesignDecorator,
];

export const LoadingState = Template.bind({});
LoadingState.args = normalArgs;
LoadingState.decorators = [() => <ArticleRecommendationsListSkeleton />];

export const LoadingStateRedesigned = Template.bind({});
LoadingStateRedesigned.args = normalArgs;
LoadingStateRedesigned.decorators = [
    () => <ArticleRecommendationsListSkeleton />,
    NewDesignDecorator,
];

export const ErrorState = Template.bind({});
ErrorState.args = normalArgs;

ErrorState.decorators = [
    () => (
        <ArticleRecommendationsListError
            errorText="На жаль, не вдалося завантажити рекомендації. Спробуйте пізніше."
            errorTitle="Помилка завантаження рекомендацій"
        />
    ),
    StoreDecorator({}),
];

export const ErrorStateRedesigned = Template.bind({});
ErrorStateRedesigned.args = normalArgs;
ErrorStateRedesigned.decorators = [
    () => (
        <ArticleRecommendationsListError
            errorText="На жаль, не вдалося завантажити рекомендації. Спробуйте пізніше."
            errorTitle="Помилка завантаження рекомендацій"
        />
    ),
    StoreDecorator({}),
    NewDesignDecorator,
];

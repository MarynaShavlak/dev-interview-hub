import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleDetails } from './ArticleDetails';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleDetailsSkeleton } from './ArticleDetailsSkeleton/ArticleDetailsSkeleton';
import { ArticleDetailsError } from './ArticleDetailsError/ArticleDetailsError';

export default {
    title: 'entities/Article/ArticleDetails',
    component: ArticleDetails,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticleDetails>;

const Template: ComponentStory<typeof ArticleDetails> = (args) => (
    <ArticleDetails {...args} />
);

const normalArgs = {
    id: '96',
};

export const Default = Template.bind({});
Default.args = normalArgs;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = normalArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];

export const LoadingState = Template.bind({});
LoadingState.args = normalArgs;
LoadingState.decorators = [() => <ArticleDetailsSkeleton />];

export const LoadingStateRedesigned = Template.bind({});
LoadingStateRedesigned.args = normalArgs;
LoadingStateRedesigned.decorators = [
    () => <ArticleDetailsSkeleton />,
    NewDesignDecorator,
];

export const ErrorState = Template.bind({});
ErrorState.args = normalArgs;
ErrorState.decorators = [() => <ArticleDetailsError />];

export const ErrorStateRedesigned = Template.bind({});
ErrorStateRedesigned.args = normalArgs;
ErrorStateRedesigned.decorators = [
    () => <ArticleDetailsError />,
    NewDesignDecorator,
];

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleRating } from '../../index';
import { ArticleRatingEnabledDecorator } from '@/shared/config/storybook/ArticleRatingEnabledDecorator/ArticleRatingEnabledDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

    decorators: [
        StoreDecorator({
            user: {
                authData: { id: 'yG3WqJQRWygRZJBFd6L9SG10rvq1' },
            },
        }),
    ],
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => (
    <ArticleRating {...args} />
);

const withRateArgs = {
    articleId: '75',
};

const withNoRateArgs = {
    articleId: '174',
};

export const Default = Template.bind({});
Default.args = withRateArgs;
Default.decorators = [ArticleRatingEnabledDecorator];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = withRateArgs;
DefaultRedesigned.decorators = [
    ArticleRatingEnabledDecorator,
    NewDesignDecorator,
];

export const WithNoRate = Template.bind({});
WithNoRate.args = withNoRateArgs;
WithNoRate.decorators = [ArticleRatingEnabledDecorator];

export const WithNoRateRedesigned = Template.bind({});
WithNoRateRedesigned.args = withNoRateArgs;
WithNoRateRedesigned.decorators = [
    ArticleRatingEnabledDecorator,
    NewDesignDecorator,
];

export const RatingDisabled = Template.bind({});
RatingDisabled.args = withNoRateArgs;

export const RatingDisabledRedesigned = Template.bind({});
RatingDisabledRedesigned.args = withNoRateArgs;

RatingDisabledRedesigned.decorators = [NewDesignDecorator];

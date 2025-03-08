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
    args: {
        articleId: '1',
    },
    decorators: [
        StoreDecorator({
            user: {
                authData: { id: '1' },
            },
        }),
    ],
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => (
    <ArticleRating {...args} />
);

const DefaultParams = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [
                {
                    rate: 4,
                },
            ],
        },
    ],
};
const ratingDisabledParams = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
};

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [ArticleRatingEnabledDecorator];
Default.parameters = DefaultParams;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {};
DefaultRedesigned.decorators = [
    ArticleRatingEnabledDecorator,
    NewDesignDecorator,
];
DefaultRedesigned.parameters = DefaultParams;

export const RatingDisabled = Template.bind({});
RatingDisabled.args = {};
RatingDisabled.parameters = ratingDisabledParams;

export const RatingDisabledRedesigned = Template.bind({});
RatingDisabledRedesigned.args = {};
RatingDisabledRedesigned.parameters = ratingDisabledParams;
RatingDisabledRedesigned.decorators = [NewDesignDecorator];

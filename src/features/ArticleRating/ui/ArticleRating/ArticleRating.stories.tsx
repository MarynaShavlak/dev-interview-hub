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

const normalParams = {
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

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [ArticleRatingEnabledDecorator];
Normal.parameters = normalParams;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [
    ArticleRatingEnabledDecorator,
    NewDesignDecorator,
];
NormalRedesigned.parameters = normalParams;

export const RatingDisabled = Template.bind({});
RatingDisabled.args = {};
RatingDisabled.parameters = ratingDisabledParams;

export const RatingDisabledRedesigned = Template.bind({});
RatingDisabledRedesigned.args = {};
RatingDisabledRedesigned.parameters = ratingDisabledParams;
RatingDisabledRedesigned.decorators = [NewDesignDecorator];

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserRatingsBubbleChart } from './UserRatingsBubbleChart';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/charts/UserRatingsBubbleChart',
    component: UserRatingsBubbleChart,
    argTypes: {
        data: { control: 'object' },
        totalArticles: { control: 'number' },
        className: { control: 'text' },
        width: { control: 'number' },
        height: { control: 'number' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof UserRatingsBubbleChart>;

const Template: ComponentStory<typeof UserRatingsBubbleChart> = (args) => (
    <div style={{ width: '800px', height: '500px', margin: 'auto' }}>
        <UserRatingsBubbleChart {...args} />
    </div>
);

const defaultArgs = {
    data: {
        user1: {
            articlesWithFeedback: 22,
            totalRating: 128,

            articlesWithRating: 27,
        },
        user2: {
            articlesWithFeedback: 8,
            totalRating: 60,

            articlesWithRating: 17,
        },
        user3: {
            articlesWithFeedback: 13,
            totalRating: 48,

            articlesWithRating: 18,
        },
        user4: {
            articlesWithFeedback: 44,
            totalRating: 50,
            articlesWithRating: 44,
        },
        user5: {
            articlesWithFeedback: 25,
            totalRating: 110,
            articlesWithRating: 30,
        },
        user6: {
            articlesWithFeedback: 18,
            totalRating: 85,
            articlesWithRating: 22,
        },
        user7: {
            articlesWithFeedback: 35,
            totalRating: 145,
            articlesWithRating: 40,
        },
        user8: {
            articlesWithFeedback: 30,
            totalRating: 120,
            articlesWithRating: 36,
        },
        user9: {
            articlesWithFeedback: 16,
            totalRating: 72,
            articlesWithRating: 19,
        },
        user10: {
            articlesWithFeedback: 40,
            totalRating: 160,
            articlesWithRating: 45,
        },
        user11: {
            articlesWithFeedback: 50,
            totalRating: 200,
            articlesWithRating: 50,
        },
        user12: {
            articlesWithFeedback: 12,
            totalRating: 58,
            articlesWithRating: 14,
        },
        user13: {
            articlesWithFeedback: 28,
            totalRating: 140,
            articlesWithRating: 32,
        },
        user14: {
            articlesWithFeedback: 20,
            totalRating: 90,
            articlesWithRating: 23,
        },
        user15: {
            articlesWithFeedback: 38,
            totalRating: 175,
            articlesWithRating: 42,
        },
        user16: {
            articlesWithFeedback: 27,
            totalRating: 115,
            articlesWithRating: 29,
        },
        user17: {
            articlesWithFeedback: 10,
            totalRating: 50,
            articlesWithRating: 12,
        },
        user18: {
            articlesWithFeedback: 33,
            totalRating: 130,
            articlesWithRating: 39,
        },
        user19: {
            articlesWithFeedback: 24,
            totalRating: 100,
            articlesWithRating: 26,
        },
        user20: {
            articlesWithFeedback: 29,
            totalRating: 122,
            articlesWithRating: 33,
        },
        user21: {
            articlesWithFeedback: 37,
            totalRating: 160,
            articlesWithRating: 41,
        },
        user22: {
            articlesWithFeedback: 15,
            totalRating: 70,
            articlesWithRating: 17,
        },
        user23: {
            articlesWithFeedback: 21,
            totalRating: 95,
            articlesWithRating: 23,
        },
        user24: {
            articlesWithFeedback: 45,
            totalRating: 180,
            articlesWithRating: 48,
        },
        user25: {
            articlesWithFeedback: 32,
            totalRating: 140,
            articlesWithRating: 35,
        },
    },
    totalArticles: 177,
    width: '600',
    height: '400',
};

const noDataArgs = {
    data: {},
    totalArticles: 0,
    width: '600',
    height: '400',
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const DarkTheme = Template.bind({});
DarkTheme.args = defaultArgs;
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const OrangeTheme = Template.bind({});
OrangeTheme.args = defaultArgs;
OrangeTheme.decorators = [ThemeDecorator(Theme.ORANGE)];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = defaultArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];

export const DarkRedesigned = Template.bind({});
DarkRedesigned.args = defaultArgs;
DarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const OrangeRedesigned = Template.bind({});
OrangeRedesigned.args = defaultArgs;
OrangeRedesigned.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.ORANGE),
];

export const WithCustomSize = Template.bind({});
WithCustomSize.args = {
    ...defaultArgs,
    width: '800',
    height: '280',
};
WithCustomSize.decorators = [NewDesignDecorator];

export const NoData = Template.bind({});
NoData.args = noDataArgs;

export const NoDataRedesigned = Template.bind({});
NoDataRedesigned.args = noDataArgs;
NoDataRedesigned.decorators = [NewDesignDecorator];

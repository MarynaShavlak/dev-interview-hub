import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleRatingDistributionChart } from './ArticleRatingDistributionChart';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/charts/ArticleRatingDistributionChart',
    component: ArticleRatingDistributionChart,
    argTypes: {
        ratingDistributionMap: { control: 'object' },
        totalArticlesWithRatings: { control: 'number' },
        className: { control: 'text' },
        chartDimensions: { control: 'object' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticleRatingDistributionChart>;

const Template: ComponentStory<typeof ArticleRatingDistributionChart> = (
    args,
) => (
    <div style={{ width: '800px', height: '500px', margin: 'auto' }}>
        <ArticleRatingDistributionChart {...args} />
    </div>
);

const defaultArgs = {
    ratingDistributionMap: new Map([
        [1, 5],
        [2, 10],
        [3, 15],
        [4, 20],
        [5, 25],
    ]),
    totalArticlesWithRatings: 75,
    width: '600',
    height: '400',
};

const noDataArgs = {
    ratingDistributionMap: new Map<number, number>(),
    totalArticlesWithRatings: 0,
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

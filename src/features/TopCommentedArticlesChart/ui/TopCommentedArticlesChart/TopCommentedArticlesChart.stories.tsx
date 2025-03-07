import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { TopCommentedArticlesChart } from '../..';

export default {
    title: 'features/charts/TopCommentedArticles',
    component: TopCommentedArticlesChart,
    argTypes: {
        articleCommentCounts: { control: 'array' },
        className: { control: 'text' },
        chartDimensions: { control: 'object' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof TopCommentedArticlesChart>;

const Template: ComponentStory<typeof TopCommentedArticlesChart> = (args) => (
    <div style={{ width: '800px', height: '500px', margin: 'auto' }}>
        <TopCommentedArticlesChart {...args} />
    </div>
);

const defaultArgs = {
    articleCommentCounts: [
        { articleId: '1', commentCount: 90, articleTitle: 'Article 1' },
        { articleId: '2', commentCount: 50, articleTitle: 'Article 2' },
        { articleId: '3', commentCount: 20, articleTitle: 'Article 3' },
    ],
    chartDimensions: { width: '600', height: '400' },
};

const noDataArgs = {
    articleCommentCounts: [],
    chartDimensions: { width: '600', height: '400' },
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
    chartDimensions: { width: '800', height: '280' },
};
WithCustomSize.decorators = [NewDesignDecorator];

export const NoData = Template.bind({});
NoData.args = noDataArgs;

export const NoDataRedesigned = Template.bind({});
NoDataRedesigned.args = noDataArgs;
NoDataRedesigned.decorators = [NewDesignDecorator];

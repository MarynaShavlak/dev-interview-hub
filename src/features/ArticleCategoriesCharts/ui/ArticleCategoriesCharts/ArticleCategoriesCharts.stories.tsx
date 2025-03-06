import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleCategoriesCharts } from './ArticleCategoriesCharts';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleStats } from '../../model/types/types';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'features/ArticleCategoriesCharts',
    component: ArticleCategoriesCharts,
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticleCategoriesCharts>;

const Template: ComponentStory<typeof ArticleCategoriesCharts> = (args) => {
    return <ArticleCategoriesCharts {...args} />;
};

const sampleData: Record<string, ArticleStats> = {
    CSS: { viewCount: 17111, articleCount: 31 },
    HTML: { viewCount: 6823, articleCount: 25 },
    React: { viewCount: 12621, articleCount: 11 },
};

const chartDimensions = { width: '385', height: '185' };

export const Default = Template.bind({});
Default.args = {
    data: sampleData,
    articlesByCategoriesDimensions: chartDimensions,
    viewsByCategoriesDimensions: chartDimensions,
};

export const DarkTheme = Template.bind({});
DarkTheme.args = Default.args;
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const OrangeTheme = Template.bind({});
OrangeTheme.args = Default.args;
OrangeTheme.decorators = [ThemeDecorator(Theme.ORANGE)];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = Default.args;
DefaultRedesigned.decorators = [NewDesignDecorator];

export const RedesignedDark = Template.bind({});
RedesignedDark.args = Default.args;
RedesignedDark.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const RedesignedOrange = Template.bind({});
RedesignedOrange.args = Default.args;
RedesignedOrange.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.ORANGE),
];

export const EmptyData = Template.bind({});
EmptyData.args = {
    data: {},
    articlesByCategoriesDimensions: chartDimensions,
    viewsByCategoriesDimensions: chartDimensions,
};

export const EmptyDataRedesigned = Template.bind({});
EmptyDataRedesigned.args = EmptyData.args;
EmptyDataRedesigned.decorators = [NewDesignDecorator];

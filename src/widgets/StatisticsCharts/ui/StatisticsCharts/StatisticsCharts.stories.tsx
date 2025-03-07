import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StatisticsCharts } from './StatisticsCharts';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StatisticsChartsError } from './StatisticsChartsError';
import { StatisticsChartsSkeleton } from './StatisticsChartsSkeleton';

export default {
    title: 'widgets/StatisticsCharts',
    component: StatisticsCharts,
    args: {},
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof StatisticsCharts>;

const Template: ComponentStory<typeof StatisticsCharts> = (args) => (
    <StatisticsCharts />
);

export const Default = Template.bind({});
export const DarkTheme = Template.bind({});
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const OrangeTheme = Template.bind({});
OrangeTheme.decorators = [ThemeDecorator(Theme.ORANGE)];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.decorators = [NewDesignDecorator];

export const DarkRedesigned = Template.bind({});
DarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const OrangeRedesigned = Template.bind({});
OrangeRedesigned.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.ORANGE),
];

export const LoadingState = Template.bind({});
LoadingState.decorators = [() => <StatisticsChartsSkeleton />];

export const LoadingStateRedesigned = Template.bind({});
LoadingStateRedesigned.decorators = [
    () => <StatisticsChartsSkeleton />,
    NewDesignDecorator,
];

export const ErrorState = Template.bind({});
ErrorState.decorators = [() => <StatisticsChartsError />];

export const ErrorStateRedesigned = Template.bind({});
ErrorStateRedesigned.decorators = [
    () => <StatisticsChartsError />,
    NewDesignDecorator,
];

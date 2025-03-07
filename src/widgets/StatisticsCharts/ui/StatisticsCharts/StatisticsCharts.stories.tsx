import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StatisticsCharts } from './StatisticsCharts';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'widgets/StatisticsCharts',
    component: StatisticsCharts,
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof StatisticsCharts>;

const Template: ComponentStory<typeof StatisticsCharts> = (args) => (
    <StatisticsCharts />
);

// Default Story - It shows a standard state for StatisticsCharts component
export const Default = Template.bind({});
Default.args = {};

// Story for Dark Theme
export const DarkTheme = Template.bind({});
DarkTheme.args = {};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

// Story for Orange Theme
export const OrangeTheme = Template.bind({});
OrangeTheme.args = {};
OrangeTheme.decorators = [ThemeDecorator(Theme.ORANGE)];

// Story for Redesigned UI
export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {};
DefaultRedesigned.decorators = [NewDesignDecorator];

// Story for Dark Theme with Redesigned UI
export const DarkRedesigned = Template.bind({});
DarkRedesigned.args = {};
DarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

// Story for Orange Theme with Redesigned UI
export const OrangeRedesigned = Template.bind({});
OrangeRedesigned.args = {};
OrangeRedesigned.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.ORANGE),
];

// // Story for No Data in StatisticsCharts
// export const NoData = Template.bind({});
// NoData.args = {
//     // Pass empty or mock data as needed
//     users: [],
//     articles: [],
//     ratings: [],
//     comments: [],
//     isLoading: false,
//     isError: false,
// };

// // Story for Loading state in StatisticsCharts
// export const Loading = Template.bind({});
// Loading.args = {
//     // Pass loading state args
//     isLoading: true,
//     isError: false,
// };
//
// // Story for Error state in StatisticsCharts
// export const Error = Template.bind({});
// Error.args = {
//     // Pass error state args
//     isLoading: false,
//     isError: true,
// };

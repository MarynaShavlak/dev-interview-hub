import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LineChart } from './LineChart';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/common/Charts/LineChart',
    component: LineChart,
    argTypes: {
        data: { control: 'array' },
        labels: { control: 'array' },
        title: { control: 'text' },
        legendPosition: { control: 'radio' },
        xAxisTitle: { control: 'text' },
        yAxisTitle: { control: 'text' },
        markers: { control: 'boolean' },
    },
} as ComponentMeta<typeof LineChart>;

const Template: ComponentStory<typeof LineChart> = (args) => {
    return (
        <div style={{ width: '800px', height: '500px', margin: 'auto' }}>
            <LineChart {...args} />
        </div>
    );
};

const defaultArgs = {
    data: [
        { name: 'Series A', data: [30, 40, 35] },
        { name: 'Series B', data: [20, 30, 25] },
        { name: 'Series C', data: [10, 15, 20] },
    ],
    labels: ['January', 'February', 'March'],
    title: 'Line Chart Example',
    xAxisTitle: 'Months',
    yAxisTitle: 'Values',
    width: '400',
    height: '500',
    legendPosition: 'right' as const,
    markers: false,
};

const noDataArgs = {
    data: [],
    labels: [],
    title: 'Line Chart Example',
    xAxisTitle: 'Months',
    yAxisTitle: 'Values',
    width: '400',
    height: '500',
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
    width: '800px',
    height: '280px',
    legendPosition: 'top' as const,
};
WithCustomSize.decorators = [NewDesignDecorator];

export const WithMarkers = Template.bind({});
WithMarkers.args = {
    ...defaultArgs,
    markers: true,
};

export const LineChartWithNoData = Template.bind({});
LineChartWithNoData.args = noDataArgs;

export const LineChartWithNoDataRedesigned = Template.bind({});
LineChartWithNoDataRedesigned.args = noDataArgs;
LineChartWithNoDataRedesigned.decorators = [NewDesignDecorator];

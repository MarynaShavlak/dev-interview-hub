import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BarChart } from './BarChart';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme'; // Update the path if necessary

export default {
    title: 'shared/common/Charts/BarChart',
    component: BarChart,
    argTypes: {
        data: { control: 'array' },
        labels: { control: 'array' },
        title: { control: 'text' },
        legendPosition: {
            control: 'radio',
            options: ['top', 'right', 'bottom', 'left'],
        },
        width: { control: 'text' },
        height: { control: 'text' },
        xAxisTitle: { control: 'text' },
        yAxisTitle: { control: 'text' },
    },
} as ComponentMeta<typeof BarChart>;

const Template: ComponentStory<typeof BarChart> = (args) => (
    <BarChart {...args} />
);

const defaultArgs = {
    data: [80, 70, 50, 40, 10],
    labels: ['Стаття 1', 'Стаття 2', 'Стаття 3', 'Стаття 4', 'Стаття 5'],
    title: 'Рейтинг статей за кількістю коментарів',
    xAxisTitle: 'Назва статті',
    yAxisTitle: 'Кількість коментарів',
    width: '500',
    height: '400',
};
export const DefaultBarChart = Template.bind({});
DefaultBarChart.args = defaultArgs;

export const DarkThemeBarChart = Template.bind({});
DarkThemeBarChart.args = defaultArgs;
DarkThemeBarChart.decorators = [ThemeDecorator(Theme.DARK)];

export const OrangeThemeBarChart = Template.bind({});
OrangeThemeBarChart.args = defaultArgs;
OrangeThemeBarChart.decorators = [ThemeDecorator(Theme.ORANGE)];

export const BarChartWithNoData = Template.bind({});
BarChartWithNoData.args = {
    data: [],
    labels: [],
    title: 'No Data Available',
    xAxisTitle: 'Month',
    yAxisTitle: 'Value',
    width: '500',
    height: '400',
};

export const BarChartWithCustomSize = Template.bind({});
BarChartWithCustomSize.args = {
    data: [5, 15, 25, 35, 45],
    labels: ['A', 'B', 'C', 'D', 'E'],
    title: 'Custom Size Chart',
    xAxisTitle: 'Category',
    yAxisTitle: 'Frequency',
    width: '600',
    height: '300',
};

export const BarChartWithNoTitle = Template.bind({});
BarChartWithNoTitle.args = {
    data: [5, 15, 25, 35, 45],
    labels: ['A', 'B', 'C', 'D', 'E'],
    title: undefined,
    xAxisTitle: 'Category',
    yAxisTitle: 'Frequency',
};

// redesigned charts
export const RedesignedDefaultBarChart = Template.bind({});
RedesignedDefaultBarChart.args = {
    data: [10, 20, 30, 40, 50],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    title: 'Monthly Sales',
    xAxisTitle: 'Month',
    yAxisTitle: 'Sales ($)',
    width: '500',
    height: '400',
};
RedesignedDefaultBarChart.decorators = [NewDesignDecorator];

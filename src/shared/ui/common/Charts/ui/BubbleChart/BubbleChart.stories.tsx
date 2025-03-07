import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BubbleChart } from './BubbleChart';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/common/Charts/BubbleChart',
    component: BubbleChart,
    argTypes: {
        data: { control: 'array' },
        title: { control: 'text' },
        width: { control: 'text' },
        height: { control: 'text' },
        minXaxisValue: { control: 'number' },
        maxXaxisValue: { control: 'number' },
        maxYaxisValue: { control: 'number' },
        xAxisTitle: { control: 'text' },
        yAxisTitle: { control: 'text' },
        legendPosition: {
            control: 'radio',
            options: ['top', 'right', 'bottom', 'left'],
        },
        tooltipData: { control: 'object' },
    },
} as ComponentMeta<typeof BubbleChart>;

const Template: ComponentStory<typeof BubbleChart> = (args) => (
    <BubbleChart {...args} />
);

const defaultArgs = {
    data: [
        {
            name: 'Dataset 1',
            data: [
                [10, 20, 30],
                [20, 30, 40],
                [30, 40, 50],
            ],
        },
    ],
    title: 'Bubble Chart Example',
    xAxisTitle: 'X Axis',
    yAxisTitle: 'Y Axis',
    minXaxisValue: 0,
    maxXaxisValue: 50,
    maxYaxisValue: 50,
    width: '500',
    height: '400',
    tooltipData: { x: 'X Value', y: 'Y Value', z: 'Size' },
};

const noDataArgs = {
    data: [],
    title: 'Bubble Chart Example',
    xAxisTitle: 'X Axis',
    yAxisTitle: 'Y Axis',
    width: '500',
    height: '400',
    tooltipData: { x: 'X', y: 'Y', z: 'Size' },
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const DarkTheme = Template.bind({});
DarkTheme.args = defaultArgs;
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const OrangeTheme = Template.bind({});
OrangeTheme.args = defaultArgs;
OrangeTheme.decorators = [ThemeDecorator(Theme.ORANGE)];

export const BubbleChartWithCustomSize = Template.bind({});
BubbleChartWithCustomSize.args = {
    ...defaultArgs,
    width: '600',
    height: '300',
};

export const RedesignedDefault = Template.bind({});
RedesignedDefault.args = defaultArgs;
RedesignedDefault.decorators = [NewDesignDecorator];

export const DarkRedesigned = Template.bind({});
DarkRedesigned.args = defaultArgs;
DarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const OrangeRedesigned = Template.bind({});
OrangeRedesigned.args = defaultArgs;
OrangeRedesigned.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.ORANGE),
];

export const BubbleChartWithNoData = Template.bind({});
BubbleChartWithNoData.args = noDataArgs;

export const BubbleChartRedesigned = Template.bind({});
BubbleChartRedesigned.args = noDataArgs;
BubbleChartRedesigned.decorators = [NewDesignDecorator];

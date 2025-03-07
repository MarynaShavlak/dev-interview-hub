import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RadialbarChart } from './RadialbarChart';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/common/Charts/RadialbarChart',
    component: RadialbarChart,
    argTypes: {
        data: { control: 'array' },
        labels: { control: 'array' },
        title: { control: 'text' },
        legendPosition: {
            control: 'radio',
        },
    },
} as ComponentMeta<typeof RadialbarChart>;

const Template: ComponentStory<typeof RadialbarChart> = (args) => {
    return (
        <div style={{ width: '500px', height: '500px', margin: 'auto' }}>
            <RadialbarChart {...args} />
        </div>
    );
};

const defaultArgs = {
    data: [70, 50, 30],
    labels: ['Progress A', 'Progress B', 'Progress C'],
    title: 'Radial Bar Chart Example',
    width: '400',
    height: '500',
    legendPosition: 'right' as const,
};
const noDataArgs = {
    data: [],
    labels: [],
    title: 'Radial Bar Chart Example',
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
    width: '200px',
    height: '200px',
};
WithCustomSize.decorators = [NewDesignDecorator];

export const RadialbarChartWithNoData = Template.bind({});
RadialbarChartWithNoData.args = noDataArgs;

export const RadialbarChartRedesigned = Template.bind({});
RadialbarChartRedesigned.args = noDataArgs;
RadialbarChartRedesigned.decorators = [NewDesignDecorator];

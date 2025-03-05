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

export const Default = Template.bind({});
Default.args = defaultArgs;

export const DarkTheme = Template.bind({});
DarkTheme.args = defaultArgs;
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const OrangeTheme = Template.bind({});
OrangeTheme.args = defaultArgs;
OrangeTheme.decorators = [ThemeDecorator(Theme.ORANGE)];

export const RadialbarChartWithNoData = Template.bind({});
RadialbarChartWithNoData.args = {
    data: [],
    labels: [],
    title: 'No Data Available',
    width: '400',
    height: '500',
};

export const RedesignedDefault = Template.bind({});
RedesignedDefault.args = defaultArgs;
RedesignedDefault.decorators = [NewDesignDecorator];

export const RedesignedDark = Template.bind({});
RedesignedDark.args = defaultArgs;
RedesignedDark.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const RedesignedOrange = Template.bind({});
RedesignedOrange.args = defaultArgs;
RedesignedOrange.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.ORANGE),
];

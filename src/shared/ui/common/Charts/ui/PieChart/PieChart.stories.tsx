import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PieChart } from './PieChart';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/common/Charts/PieChart',
    component: PieChart,
    argTypes: {
        data: { control: 'array' },
        labels: { control: 'array' },
        title: { control: 'text' },
        legendPosition: {
            control: 'radio',
        },
    },
} as ComponentMeta<typeof PieChart>;

const Template: ComponentStory<typeof PieChart> = (args) => {
    return (
        <div style={{ width: '500px', height: '500px', margin: 'auto' }}>
            <PieChart {...args} />
        </div>
    );
};

const defaultArgs = {
    data: [40, 30, 20, 10],
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    title: 'Pie Chart Example',
    width: '380',
    height: '190',
    legendPosition: 'bottom' as const,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const DarkTheme = Template.bind({});
DarkTheme.args = defaultArgs;
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const OrangeTheme = Template.bind({});
OrangeTheme.args = defaultArgs;
OrangeTheme.decorators = [ThemeDecorator(Theme.ORANGE)];

export const PieChartWithNoData = Template.bind({});
PieChartWithNoData.args = {
    data: [],
    labels: [],
    title: 'Pie Chart Example',
    width: '380',
    height: '190',
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

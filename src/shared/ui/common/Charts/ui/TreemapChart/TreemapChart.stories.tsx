import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TreemapChart } from './TreemapChart';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/common/Charts/TreemapChart',
    component: TreemapChart,
    argTypes: {
        data: { control: 'array' },
        title: { control: 'text' },
        width: { control: 'text' },
        height: { control: 'text' },
    },
} as ComponentMeta<typeof TreemapChart>;

const Template: ComponentStory<typeof TreemapChart> = (args) => {
    return (
        <div style={{ width: '500px', height: '500px', margin: 'auto' }}>
            <TreemapChart {...args} />
        </div>
    );
};

const defaultArgs = {
    data: [
        { x: 'Category A', y: 30 },
        { x: 'Category B', y: 40 },
        { x: 'Category C', y: 20 },
        { x: 'Category D', y: 10 },
    ],
    title: 'Treemap Chart Example',
    width: '400',
    height: '500',
};

const noDataArgs = {
    data: [],
    title: 'Treemap Chart Example',
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

export const TreemapChartWithNoData = Template.bind({});
TreemapChartWithNoData.args = noDataArgs;

export const TreemapChartWithNoDatRedesigned = Template.bind({});
TreemapChartWithNoDatRedesigned.args = noDataArgs;
TreemapChartWithNoDatRedesigned.decorators = [NewDesignDecorator];

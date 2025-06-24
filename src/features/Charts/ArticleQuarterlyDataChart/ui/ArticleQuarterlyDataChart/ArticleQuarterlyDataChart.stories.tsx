import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleQuarterlyDataChart } from '../../index';
import { testChartData } from '../../testing';

export default {
    title: 'features/charts/ArticleQuarterlyDataChart',
    component: ArticleQuarterlyDataChart,
    argTypes: {
        categories: { control: 'array' },
        data: { control: 'object' },
        className: { control: 'text' },
        chartDimensions: { control: 'object' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticleQuarterlyDataChart>;

const QuarterlyTemplate: ComponentStory<typeof ArticleQuarterlyDataChart> = (
    args,
) => (
    <div style={{ width: '800px', height: '500px', margin: 'auto' }}>
        <ArticleQuarterlyDataChart {...args} />
    </div>
);

const quarterlyDefaultArgs = {
    categories: ['TypeScript', 'HTML', 'React', 'JavaScript', 'CSS', 'IT'],
    chartDimensions: { width: '600', height: '400' },
    data: testChartData,
};

const quarterlyNoDataArgs = {
    categories: [],
    data: {},
    chartDimensions: { width: '600', height: '400' },
};

export const QuarterlyDefault = QuarterlyTemplate.bind({});
QuarterlyDefault.args = quarterlyDefaultArgs;

export const QuarterlyDarkTheme = QuarterlyTemplate.bind({});
QuarterlyDarkTheme.args = quarterlyDefaultArgs;
QuarterlyDarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const QuarterlyOrangeTheme = QuarterlyTemplate.bind({});
QuarterlyOrangeTheme.args = quarterlyDefaultArgs;
QuarterlyOrangeTheme.decorators = [ThemeDecorator(Theme.ORANGE)];

export const QuarterlyDefaultRedesigned = QuarterlyTemplate.bind({});
QuarterlyDefaultRedesigned.args = quarterlyDefaultArgs;
QuarterlyDefaultRedesigned.decorators = [NewDesignDecorator];

export const QuarterlyDarkRedesigned = QuarterlyTemplate.bind({});
QuarterlyDarkRedesigned.args = quarterlyDefaultArgs;
QuarterlyDarkRedesigned.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.DARK),
];

export const QuarterlyOrangeRedesigned = QuarterlyTemplate.bind({});
QuarterlyOrangeRedesigned.args = quarterlyDefaultArgs;
QuarterlyOrangeRedesigned.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.ORANGE),
];

export const QuarterlyWithCustomSize = QuarterlyTemplate.bind({});
QuarterlyWithCustomSize.args = {
    ...quarterlyDefaultArgs,
    chartDimensions: { width: '800', height: '280' },
};
QuarterlyWithCustomSize.decorators = [NewDesignDecorator];

export const QuarterlyNoData = QuarterlyTemplate.bind({});
QuarterlyNoData.args = quarterlyNoDataArgs;

export const QuarterlyNoDataRedesigned = QuarterlyTemplate.bind({});
QuarterlyNoDataRedesigned.args = quarterlyNoDataArgs;
QuarterlyNoDataRedesigned.decorators = [NewDesignDecorator];

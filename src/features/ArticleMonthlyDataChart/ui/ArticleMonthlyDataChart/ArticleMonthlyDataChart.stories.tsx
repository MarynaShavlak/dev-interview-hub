import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleMonthlyDataChart } from './ArticleMonthlyDataChart';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/charts/ArticleMonthlyDataChart',
    component: ArticleMonthlyDataChart,
    argTypes: {
        categories: { control: 'array' },
        data: { control: 'object' },
        className: { control: 'text' },
        chartDimensions: { control: 'object' },
    },
    parameters: {
        loki: { skip: true },
    },

    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticleMonthlyDataChart>;

const Template: ComponentStory<typeof ArticleMonthlyDataChart> = (args) => (
    <div style={{ width: '800px', height: '500px', margin: 'auto' }}>
        <ArticleMonthlyDataChart {...args} />
    </div>
);

const defaultArgs = {
    categories: ['IT', 'HTML', 'CSS'],
    data: {
        January: { IT: 10, HTML: 5, CSS: 8 },
        February: { IT: 15, HTML: 10, CSS: 12 },
        March: { IT: 20, HTML: 12, CSS: 15 },
    },
    chartDimensions: { width: '600', height: '400' },
};

const noDataArgs = {
    categories: [],
    data: {},
    chartDimensions: { width: '600', height: '400' },
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
    chartDimensions: { width: '800', height: '280' },
};
WithCustomSize.decorators = [NewDesignDecorator];

export const NoData = Template.bind({});
NoData.args = noDataArgs;

export const NoDataRedesigned = Template.bind({});
NoDataRedesigned.args = noDataArgs;
NoDataRedesigned.decorators = [NewDesignDecorator];

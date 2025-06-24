import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleCommentersChart } from './ArticleCommentersChart';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'features/charts/ArticleCommentersChart',
    component: ArticleCommentersChart,
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticleCommentersChart>;

const Template: ComponentStory<typeof ArticleCommentersChart> = (args) => {
    return <ArticleCommentersChart {...args} />;
};

const chartDimensions = { width: '576', height: '220' };

const defaultArgs = {
    commentCountsByUser: {
        'User A': 10,
        'User B': 15,
        'User C': 5,
    },
    chartDimensions,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const DarkTheme = Template.bind({});
DarkTheme.args = Default.args;
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const OrangeTheme = Template.bind({});
OrangeTheme.args = Default.args;
OrangeTheme.decorators = [ThemeDecorator(Theme.ORANGE)];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = Default.args;
DefaultRedesigned.decorators = [NewDesignDecorator];

export const DarkRedesigned = Template.bind({});
DarkRedesigned.args = Default.args;
DarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const OrangeRedesigned = Template.bind({});
OrangeRedesigned.args = Default.args;
OrangeRedesigned.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.ORANGE),
];

export const EmptyData = Template.bind({});
EmptyData.args = {
    commentCountsByUser: {},
    chartDimensions,
};

export const EmptyDataRedesigned = Template.bind({});
EmptyDataRedesigned.args = EmptyData.args;
EmptyDataRedesigned.decorators = [NewDesignDecorator];

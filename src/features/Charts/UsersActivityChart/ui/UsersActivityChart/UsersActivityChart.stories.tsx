import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UsersActivityChart } from './UsersActivityChart';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/charts/UsersActivityChart',
    component: UsersActivityChart,
    argTypes: {
        activeUsersList: { control: 'object' },
        totalUsers: { control: 'number' },
        className: { control: 'text' },
        width: { control: 'number' },
        height: { control: 'number' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof UsersActivityChart>;

const Template: ComponentStory<typeof UsersActivityChart> = (args) => (
    <div style={{ width: '800px', height: '500px', margin: 'auto' }}>
        <UsersActivityChart {...args} />
    </div>
);

const defaultArgs = {
    activeUsersList: {
        inArticles: new Set(['user1', 'user2', 'user3', 'user4', 'user5']),
        inComments: new Set(['user1', 'user3', 'user7', 'user8']),
        inRatings: new Set(['user2', 'user3']),
    },
    totalUsers: 10,
    width: '600',
    height: '400',
};

const noDataArgs = {
    activeUsersList: {
        inArticles: new Set([]),
        inComments: new Set([]),
        inRatings: new Set([]),
    },
    totalUsers: 10,
    width: '600',
    height: '400',
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
    width: '800',
    height: '280',
};
WithCustomSize.decorators = [NewDesignDecorator];

export const NoData = Template.bind({});
NoData.args = noDataArgs;

export const NoDataRedesigned = Template.bind({});
NoDataRedesigned.args = noDataArgs;
NoDataRedesigned.decorators = [NewDesignDecorator];

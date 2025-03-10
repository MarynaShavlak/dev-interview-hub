import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DashboardStats } from './DashboardStats';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { createActiveArticlesList } from '../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Dashboard/DashboardStats',
    component: DashboardStats,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof DashboardStats>;

const Template: ComponentStory<typeof DashboardStats> = (args) => (
    <DashboardStats {...args} />
);

const baseArgs = {
    totalUsers: 1250,
    totalArticles: 420,
    avgRating: 4.7,
    avgViews: 356,
    activeArticlesList: createActiveArticlesList(250, 180, 210),
};

export const Default = Template.bind({});
Default.args = baseArgs;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = baseArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];

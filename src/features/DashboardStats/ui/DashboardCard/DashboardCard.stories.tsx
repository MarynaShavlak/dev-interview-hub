import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DashboardCard } from './DashboardCard';
import UserIcon from '@/shared/assets/icons/avatar.svg';
import StarIcon from '@/shared/assets/icons/star.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import CommentIcon from '@/shared/assets/icons/comment.svg';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Dashboard/DashboardCard',
    component: DashboardCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof DashboardCard>;

const Template: ComponentStory<typeof DashboardCard> = (args) => (
    <div style={{ width: '300px' }}>
        <DashboardCard {...args} />
    </div>
);

const baseArgs = {
    title: 'Загальна кількість',
    value: '45231',
};

export const WithNoIcon = Template.bind({});
WithNoIcon.args = baseArgs;

export const WithNoIconRedesigned = Template.bind({});
WithNoIconRedesigned.args = baseArgs;
WithNoIconRedesigned.decorators = [NewDesignDecorator];

export const WithUserIcon = Template.bind({});
WithUserIcon.args = {
    ...baseArgs,
    Icon: UserIcon,
};

export const WithUserIconRedesigned = Template.bind({});
WithUserIconRedesigned.args = {
    ...baseArgs,
    Icon: UserIcon,
};
WithUserIconRedesigned.decorators = [NewDesignDecorator];

export const WithLongTitle = Template.bind({});
WithLongTitle.args = {
    title: 'Very Long Dashboard Card Title That Might Wrap',
    value: '42',
    Icon: ArticleIcon,
};

export const WithLongTitleRedesigned = Template.bind({});
WithLongTitleRedesigned.args = {
    title: 'Very Long Dashboard Card Title That Might Wrap',
    value: '42',
    Icon: ArticleIcon,
};
WithLongTitleRedesigned.decorators = [NewDesignDecorator];

// Card with long value
export const WithLongValue = Template.bind({});
WithLongValue.args = {
    title: 'Complex Metric',
    value: '142,568,973',
    Icon: CommentIcon,
};

// Card with percentage value
export const WithPercentageValue = Template.bind({});
WithPercentageValue.args = {
    title: 'Growth Rate',
    value: '+27.4%',
    Icon: StarIcon,
};

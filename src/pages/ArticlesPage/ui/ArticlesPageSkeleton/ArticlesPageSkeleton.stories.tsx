import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ArticlesPageSkeleton } from './ArticlesPageSkeleton';

export default {
    title: 'pages/ArticlesPage/ArticlesPageSkeleton',
    component: ArticlesPageSkeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticlesPageSkeleton>;

const Template: ComponentStory<typeof ArticlesPageSkeleton> = () => (
    <ArticlesPageSkeleton />
);

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator];

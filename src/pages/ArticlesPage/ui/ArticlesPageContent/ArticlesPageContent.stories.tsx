import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { baseArgs } from '../../testing';
import { ArticlesPageContent } from './ArticlesPageContent';

export default {
    title: 'pages/ArticlesPage/ArticlesPageContent',
    component: ArticlesPageContent,
    argTypes: {
        onInfiniteScroll: { action: 'onInfiniteScroll' },
    },
    args: {},
} as ComponentMeta<typeof ArticlesPageContent>;

const Template: ComponentStory<typeof ArticlesPageContent> = (args) => (
    <ArticlesPageContent />
);

const loadingState = {
    isLoading: true,
    ids: [],
    entities: {},
};

const errorState = {
    isLoading: false,
    ids: [],
    entities: {},
    error: 'Failed to load articles',
};

export const Grid = Template.bind({});
Grid.decorators = [StoreDecorator(baseArgs)];

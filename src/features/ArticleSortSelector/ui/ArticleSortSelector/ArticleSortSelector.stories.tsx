import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleSortSelector } from './ArticleSortSelector';
import { ArticleSortField, ArticleSortType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { AlgoliaSearchDecorator } from '@/shared/config/storybook/AlgoliaSearchDecorator/AlgoliaSearchDecorator';

export default {
    title: 'features/ArticleSortSelector',
    component: ArticleSortSelector,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleSortSelector>;

const Template: ComponentStory<typeof ArticleSortSelector> = (args) => {
    const { order: argsOrder, sort: argsSort } = args;
    const [order, setOrder] = useState<SortOrder>(argsOrder || 'asc');
    const [sort, setSort] = useState<ArticleSortType>(argsSort || 'title');

    const handleOrderChange = (newOrder: SortOrder) => {
        setOrder(newOrder);
    };

    const handleSortChange = (newSort: ArticleSortType) => {
        setSort(newSort);
    };

    return (
        <ArticleSortSelector
            {...args}
            order={order}
            sort={sort}
            onChangeOrder={handleOrderChange}
            onChangeSort={handleSortChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {};

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {
    order: 'asc',
    sort: ArticleSortField.TITLE_ASC,
};
DefaultRedesigned.decorators = [
    (Story) => AlgoliaSearchDecorator(Story, ArticleSortField.TITLE_ASC), // You can specify your desired index name here
    NewDesignDecorator,
];

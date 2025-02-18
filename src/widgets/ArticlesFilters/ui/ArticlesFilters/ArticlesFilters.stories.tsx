export {};

// import { ComponentMeta, ComponentStory } from '@storybook/react';
// import { useState } from 'react';
// import { ArticlesFilters } from './ArticlesFilters';
// import { ArticleSortField, ArticleCategory } from '@/entities/Article';
// import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
// import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
// import { SortOrder } from '@/shared/types/sortOrder';
//
// export default {
//     title: 'widgets/ArticlesFilters',
//     component: ArticlesFilters,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
//     decorators: [StoreDecorator({})],
// } as ComponentMeta<typeof ArticlesFilters>;
//
// const Template: ComponentStory<typeof ArticlesFilters> = (args) => {
//     const {
//         search: argsSearch,
//         order: argsOrder,
//         sort: argsSort,
//         category: argsCategory,
//     } = args;
//
//     const [search, setSearch] = useState<string>(argsSearch || '');
//     const [order, setOrder] = useState<SortOrder>(argsOrder || 'asc');
//     const [sort, setSort] = useState<ArticleSortField>(
//         argsSort || ArticleSortField.CREATED_ASC,
//     );
//     const [category, setCategory] = useState<ArticleCategory>(
//         argsCategory || ArticleCategory.ALL,
//     );
//
//     const handleSearchChange = (value: string) => setSearch(value);
//     const handleOrderChange = (newOrder: SortOrder) => setOrder(newOrder);
//     const handleSortChange = (newSort: ArticleSortField) => setSort(newSort);
//     const handleCategoryChange = (newCategory: ArticleCategory) =>
//         setCategory(newCategory);
//
//     return (
//         <ArticlesFilters
//             {...args}
//             search={search}
//             order={order}
//             sort={sort}
//             category={category}
//             onChangeSearch={handleSearchChange}
//             onChangeOrder={handleOrderChange}
//             onChangeSort={handleSortChange}
//             onChangeCategory={handleCategoryChange}
//         />
//     );
// };
//
// export const Normal = Template.bind({});
// Normal.args = {
//     sort: ArticleSortField.CREATED_ASC,
//     order: 'asc',
//     category: ArticleCategory.ALL,
//     search: '',
// };
//
// export const NormalRedesigned = Template.bind({});
// NormalRedesigned.args = {
//     ...Normal.args,
// };
// NormalRedesigned.decorators = [NewDesignDecorator];

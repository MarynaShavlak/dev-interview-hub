# ArticlesFiltersDeprecated

## Overview
The `ArticlesFiltersDeprecated` component provides a user interface for filtering articles in a React application. It integrates several UI elements to allow users to sort articles, search by keywords, and filter by categories. This component is designed using deprecated UI components and styles, and it serves as a transitional solution before moving to a redesigned version.

##  Type Definition
```typescript
export interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    category: ArticleCategory;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeCategory: (category: ArticleCategory) => void;
}
```

## Props

The **`ArticlesFiltersDeprecated`** component accepts the following props:

| Prop              | Type                                  | Required / Optional | Description                                                  |
|-------------------|---------------------------------------|----------------------|--------------------------------------------------------------|
| `className`       | `string`                              | Optional             | Custom class name for additional styling.                   |
| `search`          | `string`                              | Required              | The current search query.                                  |
| `sort`            | `ArticleSortField`                    | Required              | The current sort criterion.                                |
| `order`           | `SortOrder`                           | Required              | The current sort order (e.g., ascending or descending).      |
| `category`        | `ArticleCategory`                     | Required              | The currently selected category.                           |
| `onChangeOrder`   | `(newOrder: SortOrder) => void`       | Required              | Callback function for handling order changes (ascending/descending). |
| `onChangeCategory`| `(category: ArticleCategory) => void` | Required              | Callback function for handling category changes.            |
| `onChangeSearch`  | `(value: string) => void`            | Required              | Callback function for handling search input changes.         |
| `onChangeSort`    | `(newSort: ArticleSortField) => void`              | Required              | Callback function for handling sort changes.                |


## Features
1. **Sorting Options**: Allows users to select sorting criteria and order for the article list.
2. **Search Input**: Provides a text input for searching articles.
3. **Category Tabs**: Displays category tabs for filtering articles based on selected categories.

## Usage Example
```typescript jsx
import { useState } from 'react';
import { ArticlesFiltersDeprecated } from '@/widgets/ArticlesFilters';
import { ArticleSortField, SortOrder, ArticleCategory } from '@/entities/Article';

const ExampleComponent = () => {
    const {
        onChangeSort,
        onChangeCategory,
        sort,
        category,
        onChangeSearch,
        search,
        onChangeOrder,
        order,
    } = useArticleFilters();

    return (
        <ArticlesFiltersDeprecated
            className="customFilters"
            search={search}
            sort={sort}
            order={order}
            category={category}
            onChangeSearch={setSearch}
            onChangeSort={setSort}
            onChangeOrder={setOrder}
            onChangeCategory={setCategory}
        />
    );
};
```

## Conclusion
The `ArticlesFiltersDeprecated` component offers a comprehensive filtering solution for articles, leveraging legacy UI components to provide sorting, searching, and category filtering functionalities. It serves as an interim component while transitioning to a redesigned version, ensuring continuity and usability in the article filtering process.

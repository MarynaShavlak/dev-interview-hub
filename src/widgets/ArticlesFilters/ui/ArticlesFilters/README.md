# ArticlesFilters

## Overview
The `ArticlesFilters` component dynamically switches between the `ArticlesFiltersRedesigned` and `DeprecatedArticlesFilters` components based on the `isAppRedesigned` feature flag. This approach allows the application to provide either a modern or legacy filtering interface, depending on the current feature configuration. By adapting to the feature flag, the component ensures that users receive a consistent and appropriate filtering experience while transitioning between design systems.

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

The **`ArticlesFilters`** component accepts the following props:

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
1. **Feature Flag Driven**: The component adapts between the `ArticlesFiltersRedesigned` and `DeprecatedArticlesFilters` interfaces based on the `isAppRedesigned` feature flag. This allows the application to provide either a modern or legacy filtering experience, depending on the feature configuration.
2. **Consistent Filtering Experience**: Ensures that filtering functionalities such as sorting, searching, and category selection remain consistent, regardless of whether the user interacts with modern or legacy components.

## Usage Example
```typescript jsx
import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;
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
        <ArticlesFilters
            category={category}
            onChangeSearch={onChangeSearch}
            order={order}
            onChangeOrder={onChangeOrder}
            search={search}
            sort={sort}
            onChangeSort={onChangeSort}
            onChangeCategory={onChangeCategory}
            className={className}
        />
    );
});
```

## Conclusion
The `ArticlesFilters` component is essential for providing a flexible filtering interface for articles. 
By utilizing the `isAppRedesigned` feature flag, it dynamically switches between the `ArticlesFiltersRedesigned` and `DeprecatedArticlesFilters` components, offering users a modern or legacy filtering experience based on the application's configuration. 
This adaptability ensures that filtering functionalities, including sorting, searching, and category selection, are consistently available, regardless of the design system in use. The component plays a critical role in maintaining a seamless user experience while accommodating both current and future design paradigms.

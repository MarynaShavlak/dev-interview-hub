# ArticleSortSelector Feature

## Overview
The **`ArticleSortSelector`** component dynamically switches between the  `RedesignedArticleSortSelector` or the `DeprecatedArticleSortSelector` based on the `isAppRedesigned` feature flag.
This ensures users interact with either the modern or legacy interface depending on the application's current configuration. 
The component provides sorting functionality for articles, allowing users to sort articles by different fields and order, thus enhancing the user's control over content organization.

## Type Definition
```typescript
interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}
```

## Props
The **`ArticleSortSelector`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `order` | `SortOrder`   | Required             | The current order of sorting (e.g., ascending or descending)              |
| `sort` | `ArticleSortField`   | Required             | The current field by which articles are sorted ( views, title, createdAt) |
| `onChangeOrder` | `(newOrder: SortOrder) => void`   | Required              | Callback function to handle changes in sort order.                                 |
| `onChangeSort` | `(sort: ArticleSortField) => void`   | Required              | Callback function to handle changes in sort field.                                 |
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |


## Features
1. **Feature Flag Driven**: Adapts between the redesigned and deprecated sorting interfaces based on the `isAppRedesigned` feature flag, ensuring consistent application of the design system.
2. **Comprehensive Sorting**: Provides users with the ability to sort articles by various fields and in different orders, enhancing content organization and accessibility.


## Usage Example
```typescript jsx
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';

const App = () => {
    const handleOrderChange = (order: SortOrder) => {
        console.log('Order changed to:', order);
    };

    const handleSortChange = (sort: ArticleSortField) => {
        console.log('Sort field changed to:', sort);
    };

    return (
        <div>
            <ArticleSortSelector
                className="my-custom-class"
                order="asc"
                sort={ArticleSortField.DATE}
                onChangeOrder={handleOrderChange}
                onChangeSort={handleSortChange}
            />
            {/*  The ArticleSortSelector component adapts to the application's feature flag settings */}
        </div>
    );
};
```
## Conclusion
The **`ArticleSortSelector`** component is essential for providing a flexible and user-friendly article sorting interface. By leveraging feature flags, it seamlessly transitions between legacy and modern sorting interfaces, ensuring a consistent and optimal user experience. Its robust sorting capabilities, along with interactive callbacks, empower users to efficiently organize and access content according to their preferences.

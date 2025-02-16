# RedesignedArticleSortSelector

## Overview
The **`RedesignedArticleSortSelector`** component is rendered when the feature flag `isAppRedesigned` is `true`, providing users with an enhanced and modern interface for sorting articles.
If this feature flag is not active,  the `DeprecatedArticleSortSelector` is rendered instead. 
This component utilizes the latest UI elements to ensure a seamless and intuitive user experience.

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
The **`RedesignedArticleSortSelector`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `order` | `SortOrder`   | Required             | The current order of sorting (e.g., ascending or descending)              |
| `sort` | `ArticleSortField`   | Required             | The current field by which articles are sorted ( views, title, createdAt) |
| `onChangeOrder` | `(newOrder: SortOrder) => void`   | Required              | Callback function to handle changes in sort order.                                 |
| `onChangeSort` | `(sort: ArticleSortField) => void`   | Required              | Callback function to handle changes in sort field.                                 |
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |


## Features
1. **Modern UI Elements**: Utilizes the latest UI components to provide a refreshed and contemporary look and feel.

2. **User-Friendly Sorting**: Allows users to easily sort articles by different fields and orders, improving the overall user experience.

3. **Customizability** : Supports additional styling through the `className` prop, enabling easy integration with existing designs.

## Usage Example
```typescript jsx
import { RedesignedArticleSortSelector } from '@/features/ArticleSortSelector/RedesignedArticleSortSelector';
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
            <RedesignedArticleSortSelector
                className="my-custom-class"
                order="asc"
                sort={ArticleSortField.DATE}
                onChangeOrder={handleOrderChange}
                onChangeSort={handleSortChange}
            />
            {/* The RedesignedArticleSortSelector component allows users to sort articles by various fields and order */}
        </div>
    );
};
```
## Conclusion
The **`RedesignedArticleSortSelector`** component is a vital element for applications utilizing the latest design system. By offering an intuitive and modern interface for sorting articles, it significantly enhances the user experience while aligning with contemporary design standards.

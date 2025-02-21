# DeprecatedArticleSortSelector

## Overview
The **`DeprecatedArticleSortSelector`** component is rendered when the feature flag `isAppRedesigned` is `false`, providing users with deprecated interface for sorting articles. When this flag is active feature flag, the `ArticleSortSelectorRedesigned` is rendered instead.
This component ensures that users still have access to sorting functionalities using deprecated UI elements, maintaining a consistent and familiar user experience during the transition phase.

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
The **`DeprecatedArticleSortSelector`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `order` | `SortOrder`   | Required             | The current order of sorting (e.g., ascending or descending)              |
| `sort` | `ArticleSortField`   | Required             | The current field by which articles are sorted ( views, title, createdAt) |
| `onChangeOrder` | `(newOrder: SortOrder) => void`   | Required              | Callback function to handle changes in sort order.                                 |
| `onChangeSort` | `(sort: ArticleSortField) => void`   | Required              | Callback function to handle changes in sort field.                                 |
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |


## Features
1.**Backward Compatibility**: Utilizes deprecated UI components to ensure compatibility with older versions of the application, facilitating a smooth transition to new UI elements.

2.**User-Friendly Sorting**: Allows users to easily sort articles by different fields and orders, improving the overall user experience.

## Usage Example
```typescript jsx
import { DeprecatedArticleSortSelector } from '@/features/ArticleSortSelector/DeprecatedArticleSortSelector';
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
            <DeprecatedArticleSortSelector
                className="my-custom-class"
                order="asc"
                sort={ArticleSortField.DATE}
                onChangeOrder={handleOrderChange}
                onChangeSort={handleSortChange}
            />
            {/* The DeprecatedArticleSortSelector component allows users to sort articles by various fields and order */}
        </div>
    );
};
```
## Conclusion
The **`DeprecatedArticleSortSelector`** component is essential for maintaining backward compatibility within applications that are transitioning to a new design system. By providing users with a familiar and intuitive interface for sorting articles, it ensures a seamless and user-friendly experience while leveraging deprecated UI components.

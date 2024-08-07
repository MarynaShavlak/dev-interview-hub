# FiltersContainer

## Overview
The **`FiltersContainer`**   component serves as a container for the `ArticlesFilters` component, managing the filtering state and handlers for articles. It utilizes the `useArticleFilters` custom hook to obtain necessary filtering data, such as sort order, search query, and selected category, as well as handlers for updating these values. This component ensures that `ArticlesFilters` is provided with all required props to function correctly, facilitating a seamless filtering experience for users.

## Props
The **`FiltersContaine`** component accepts the following props:

| Prop        | Type       | Required / Optional | Description                                                               |
|-------------|------------|----------------------|---------------------------------------------------------------------------|
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |

## Features
1. **State Management**: Utilizes the `useArticleFilters` hook to manage and provide article filtering data, including sort, order, search query, and category.

2. **Handlers Integration**: Supplies the `ArticlesFilters` component with functions to handle changes to filtering criteria, such as sorting, searching, and category selection.

3. **Dynamic Filtering**: Ensures that the `ArticlesFilters` component receives up-to-date filtering data and handlers, allowing users to interact with the article filters effectively.

## Usage Example
```typescript jsx
import { FiltersContainer } from '@/pages/ArticlesPage';

const ArticlesPage = () => {
    return (
        <div>
            <FiltersContainer className="customFilters" />
            {/* The FiltersContainer manages and provides filtering data to the ArticlesFilters */}
        </div>
    );
};

```
## Conclusion
The **`FiltersContainer`** component is essential for managing and providing filtering state and handlers to the `ArticlesFilters` component. 
By leveraging the `useArticleFilters` hook, it ensures that all necessary filtering data and functions are supplied, facilitating an effective and user-friendly article filtering experience. The component plays a critical role in connecting the filtering logic with the user interface, enabling smooth and responsive interactions with article filters.

# ArticleCategoryTabs Feature 

## Overview
The **`ArticleCategoryTabs`** component is a specialized tab component for categorizing articles in a React application. It allows users to switch between different article categories seamlessly, providing an intuitive interface for content filtering. The component supports feature toggling to switch between redesigned and deprecated tab styles.

## Type Definition 
```typescript
interface ArticleCategoryTabsProps {
    className?: string;
    value: ArticleCategory;
    onChangeCategory: (category: ArticleCategory) => void;
}
```

## Props
The **`ArticleCategoryTabs`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                          |
|------------|------------|----------------------|------------------------------------------------------|
| `value`  | `ArticleCategory` | Required             | The currently selected article category.       |
| `onChangeCategory`    | `(category: ArticleCategory) => void`  | Required             | Callback function to handle category change actions.      |
| `className` | `string`   | Optional             | Custom class name for additional styling.           |


## Features
1. **Dynamic Category Tabs**: Utilizes the `useCategoryTabs` hook to dynamically generate category tabs, allowing for flexible and scalable category management.

2. **Feature Toggling:**: Integrates with `ToggleFeaturesComponent` to conditionally render either the redesigned or deprecated tab styles based on feature flags.

## Usage Example
```typescript jsx
import { memo } from 'react';
import { ArticleCategoryTabs } from '@/features/ArticleCategoryTabs';
import { ArticleCategory } from '@/entities/Article';

const ExampleComponent = () => {
    const [category, setCategory] = useState<ArticleCategory>('ALL');

    const handleCategoryChange = (newCategory: ArticleCategory) => {
        setCategory(newCategory);
    };

    return (
        <ArticleCategoryTabs
            className="customClass"
            value={category}
            onChangeCategory={handleCategoryChange}
        />
    );
};
```
## Conclusion
The **`ArticleCategoryTabs`** component is an efficient and user-friendly solution for managing article categories in a React application. By leveraging dynamic hooks, optimized performance techniques, and feature toggling, it provides a seamless experience for users while ensuring maintainability and scalability for developers.

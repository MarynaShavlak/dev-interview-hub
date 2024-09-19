# ArticleList

## Overview
The **`ArticleList`** component is designed to render a list or grid of articles, providing flexibility in presentation based on the selected view (grid or list). It dynamically handles the rendering of article cards and incorporates loading states to ensure a smooth user experience during data fetching. The component adapts its layout and design based on feature flags, specifically supporting the transition to a redesigned interface when the `isAppRedesigned` flag is enabled.

The `ArticleList` can be configured to render in different views, including a classic list or a responsive grid, depending on the `view` prop. It efficiently manages rendering with support for skeleton loading to ensure seamless interactions during content load times. Furthermore, each article is represented by the `ArticleCard` component, which adapts to the selected view for a consistent look across the application.

## Props
The **`ArticleList`** component accepts the following props:

| Prop        | Type                      | Required / Optional | Description                                                               |
|-------------|---------------------------|---------------------|---------------------------------------------------------------------------|
| `className` | `string`                  | Optional            | Additional class names for custom styling.                                |
| `articles`  | `Article[]`               | Required            | The array of articles to be displayed, where each article is an object.   |
| `isLoading` | `boolean`                 | Optional            | Indicates whether articles are currently loading, triggering a skeleton UI.|
| `target`    | `HTMLAttributeAnchorTarget`| Optional            | Sets the anchor target attribute for links, such as `_blank` for new tabs. |
| `view`      | `ArticleView`             | Required            | Specifies the view mode (`GRID` or `LIST`) for rendering the articles.     |

## Features

1. **Article Rendering**: The `ArticleList` utilizes the `ArticleCard` component to render each article. Each card adjusts to the selected view, ensuring a consistent and cohesive presentation of article data.

2. **Loading State**: Displays a skeleton UI (`ArticleListSkeleton`) while articles are being fetched. This helps users understand that content is loading and provides a smooth experience during data retrieval.

3. **Feature Flag Adaptation**: The component adapts its design based on the `isAppRedesigned` feature flag. When the flag is active, it uses redesigned styles for a more modern UI, but maintains backward compatibility with the legacy layout when the flag is inactive.


## Usage Example
```typescript jsx
import { ArticleList } from '@/components/ArticleList';
import { ArticleView } from '@/model/consts/articleConsts';

const articles = [
    { id: 1, title: 'Article 1', content: '...' },
    { id: 2, title: 'Article 2', content: '...' },
    // More articles
];

const App = () => {
    return (
        <div className="app-article-list">
            <ArticleList
                articles={articles}
                view={ArticleView.GRID}
                isLoading={false}
            />
            {/* The ArticleList component handles rendering articles in either grid or list view */}
        </div>
    );
};
```

## Conclusion 
The `ArticleList` component is a versatile and responsive solution for displaying a list or grid of articles. It efficiently manages both content rendering and loading states, ensuring a seamless user experience. With support for feature flags, the component easily transitions to a redesigned UI when necessary, while maintaining flexibility in view modes and handling of article data. The inclusion of skeleton loading further enhances its usability, ensuring users are aware of ongoing content fetching while browsing through the application

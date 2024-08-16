# ArticleInfiniteList

## Overview
The **`ArticleInfiniteList`** component is a versatile container that dynamically renders either the `RedesignedArticleInfiniteList` or the `DeprecatedArticleInfiniteList` based on the `isAppRedesigned` feature flag. This setup ensures that users interact with the most appropriate version of the article list component according to the application's configuration. By leveraging feature flags, the component provides a seamless transition between the legacy and modern interfaces, allowing for a consistent user experience regardless of the underlying design.

The component is responsible for managing infinite scrolling and rendering a list or grid of articles efficiently. It handles different states such as loading, error conditions, and no articles found, ensuring users receive relevant feedback and a smooth interaction.

## Props
The **`ArticleInfiniteList`** component accepts the following props:

| Prop               | Type                  | Required / Optional | Description                                             |
|--------------------|-----------------------|----------------------|---------------------------------------------------------|
| `onInfiniteScroll` | `() => void`          | Required             | Callback function to be invoked when infinite scroll is triggered. |

## Features

1. **Feature Flag Integration**: Seamlessly integrates with feature flags to toggle between redesigned and deprecated versions of the article list,depending on the `isAppRedesigned` feature flag. This allows the application to adapt to the latest design changes or maintain compatibility with the legacy UI.

2. **Virtualization**: Implements virtualization to render only the visible elements in the viewport, optimizing performance and reducing memory usage, which is crucial for handling extensive lists or grids of articles efficiently.


## Usage Example
```typescript jsx
import { ArticleInfiniteList } from '@/components/ArticleInfiniteList';

const App = () => {
    const handleInfiniteScroll = () => {
        // Logic to load more articles
    };

    return (
        <div className="article-list">
            <ArticleInfiniteList onInfiniteScroll={handleInfiniteScroll} />
            {/* The ArticleInfiniteList component adapts based on the feature flag to provide either the redesigned or deprecated UI */}
        </div>
    );
};
```

## Conclusion
The `ArticleInfiniteList` component is essential for managing and displaying a list of articles in a manner that adapts to both modern and legacy interfaces. By using feature flags to conditionally render the `RedesignedArticleInfiniteList` or `DeprecatedArticleInfiniteList`, it ensures that users have a consistent and optimized experience based on the application's design configuration.

This component efficiently handles infinite scrolling, loading states, error conditions, and no articles scenarios, providing a robust solution for displaying articles. Its ability to toggle between different UI versions facilitates a smooth transition to newer designs while maintaining compatibility with older interfaces, ultimately enhancing user experience and performance.

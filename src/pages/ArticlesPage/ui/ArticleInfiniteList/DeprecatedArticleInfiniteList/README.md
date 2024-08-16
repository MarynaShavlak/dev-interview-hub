# DeprecatedArticleInfiniteList

## Overview
The **`DeprecatedArticleInfiniteList`** component is utilized to render articles in a legacy interface when the `isAppRedesigned` feature flag is set to false. It provides a way to display articles with older UI elements and supports infinite scrolling, adapting its layout to either a list or grid view based on the user's preferences. The component uses the Virtuoso library to implement virtualization, which efficiently renders only the items currently visible in the viewport. This technique optimizes performance and minimizes memory usage, which is especially important when dealing with large collections of articles.

The component includes legacy features such as a filters container and a view selector, maintaining compatibility with the older design. It also handles various states like loading and error conditions and provides feedback when no articles are found, ensuring a consistent user experience.

## Props
The **`DeprecatedArticleInfiniteList`** component accepts the following props:

| Prop               | Type                  | Required / Optional | Description                                             |
|--------------------|-----------------------|----------------------|---------------------------------------------------------|
| `onInfiniteScroll` | `() => void`          | Required             | Callback function to be invoked when infinite scroll is triggered. |

## Features

1. **Dynamic Layouts**: Utilizes Virtuoso's `Virtuoso` and `VirtuosoGrid` components to render articles in either a list or grid layout. The layout adapts based on the current view setting, controlled by the `useArticlesPageView` hook.

2. **Virtualization**: Implements virtualization through Virtuoso to render only the items currently in the viewport. This approach reduces the number of DOM elements created, improving performance and decreasing memory usage, which is crucial for managing extensive article lists or grids.

3. **Loading and Error Handling**:
    - **Loading State**: Displays a loading skeleton (`ArticleListSkeleton`) while data is being fetched, providing a placeholder UI to enhance user experience during content loading.
    - **Error State**: Shows the `ArticleInfiniteListError` component if an error occurs during data retrieval, giving users feedback about the issue.

4. **Scroll Management**: Uses the `useArticlesScroll` hook to manage and preserve scroll positions, ensuring users return to the correct position when navigating back to the articles list.

5. **Grid Skeleton Visibility**: Determines when to display a grid skeleton using the `useGridSkeletonVisibility` hook, improving user experience with a placeholder UI during initial grid rendering.

6. **Legacy UI Elements**: Includes the `FiltersContainer` and `ViewSelectorContainer` components to offer filtering and view selection options consistent with the older design.

7. **No Articles Found**: Displays the `NoArticlesFound` component when no articles are available, such as during a search with no matching results. This feature offers a clear and appropriate message to inform users about the absence of articles, improving user experience.

## Usage Example
```typescript jsx
import { DeprecatedArticleInfiniteList } from '@/components/DeprecatedArticleInfiniteList';

const App = () => {
    const handleInfiniteScroll = () => {
        // Logic to load more articles
    };

    return (
        <div className="article-list">
            <DeprecatedArticleInfiniteList onInfiniteScroll={handleInfiniteScroll} />
            {/* The DeprecatedArticleInfiniteList component handles displaying and scrolling through a list of articles */}
        </div>
    );
};
```

## Conclusion 
The `DeprecatedArticleInfiniteList` component is essential for displaying articles within a legacy user interface when the `isAppRedesigned` feature flag is not active. By leveraging virtualization through Virtuoso, it ensures that only the elements visible in the viewport are rendered, enhancing performance and reducing memory usage.

This component effectively handles loading and error states, adapts its layout based on user preferences, and maintains legacy features such as filtering and view selection. The inclusion of the `NoArticlesFound` component provides a clear message when no articles are available, improving the overall user experience. While transitioning to newer UI components, the `DeprecatedArticleInfiniteList` ensures continuity and functionality, supporting users with an older design while maintaining performance and usability

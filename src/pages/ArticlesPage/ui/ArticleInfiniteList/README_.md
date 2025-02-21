# ArticleInfiniteListRedesigned

## Overview
The **`ArticleInfiniteListRedesigned`** component is designed to present a modern and efficient way of displaying articles with support for infinite scrolling and dynamic layout adjustments. It utilizes the Virtuoso library to implement virtualization, which allows rendering only the elements currently in the viewport rather than all DOM elements at once. This approach optimizes performance and reduces memory usage, especially in long lists or grids. The component adapts its presentation based on feature flags and user interactions, ensuring a seamless experience during the transition to newer UI components. When the `isAppRedesigned` feature flag is activated, it switches to using updated UI elements, providing a more contemporary interface while maintaining support for legacy designs.
Additionally, the component includes a **ScrollToTopButton**, which allows users to smoothly scroll to the top of the page with a single click. This feature enhances navigation by providing an easy way to return to the top, particularly useful for lengthy lists or grids.

## Props
The **`ArticleInfiniteListRedesigned`** component accepts the following props:

| Prop               | Type                  | Required / Optional | Description                                             |
|--------------------|-----------------------|----------------------|---------------------------------------------------------|
| `onInfiniteScroll` | `() => void`          | Required             | Callback function to be invoked when infinite scroll is triggered. |

## Features

1. **Dynamic Layouts**: Utilizes Virtuoso's `Virtuoso` and `VirtuosoGrid` components to render articles in either a list or grid layout. The layout adapts based on the current view setting, controlled by the `useArticlesPageView` hook.

2. **Virtualization**: Implements virtualization through Virtuoso to render only the items currently in the viewport. This reduces the number of DOM elements created, enhancing performance and decreasing memory usage, which is crucial for handling large lists or grids efficiently.

3. **Loading and Error Handling**:
    - **Loading State**: Displays a loading skeleton (`ArticleListSkeleton`) while data is being fetched, providing a placeholder UI to enhance user experience during content loading.
    - **Error State**: Shows the `ArticleInfiniteListError` component if an error occurs during data retrieval, giving users feedback about the issue.

4. **Scroll Management**: Integrates with the `useArticlesScroll` hook to manage and preserve scroll positions, ensuring users return to the correct position when navigating back to the articles list.

5. **Grid Skeleton Visibility**: Determines when to display a grid skeleton using the `useGridSkeletonVisibility` hook, improving user experience with a placeholder UI during initial grid rendering.

6. **ScrollToTopButton**: Includes a `ScrollToTopButton` that allows users to smoothly scroll to the top of the page. This feature provides enhanced navigation and usability, especially for lengthy lists or grids.

7. **No Articles Found**: Displays the `NoArticlesFound` component when no articles are available, such as during a search with no matching results. This feature offers a clear and appropriate message to inform users about the absence of articles, enhancing user experience.


## Usage Example
```typescript jsx
import { ArticleInfiniteListRedesigned } from '@/components/ArticleInfiniteListRedesigned';

const App = () => {
    const handleInfiniteScroll = () => {
        // Logic to load more articles
    };

    return (
        <div className="article-list">
            <ArticleInfiniteListRedesigned onInfiniteScroll={handleInfiniteScroll} />
            {/* The ArticleInfiniteListRedesigned component handles displaying and scrolling through a list of articles */}
        </div>
    );
};

```
 ## Conclusion 
The `ArticleInfiniteListRedesigned` component is crucial for efficiently managing and displaying a large number of articles. By implementing virtualization through Virtuoso, it ensures that only the elements visible in the viewport are rendered, which significantly enhances performance and reduces memory usage. The component adeptly handles various states such as loading and errors, and adapts its layout based on feature flags, providing a smooth and responsive user experience.

Its virtualization approach plays a key role in optimizing the handling of extensive article lists or grids, while the inclusion of the `ScrollToTopButton` feature enhances navigation by allowing users to quickly return to the top of the page. This combination of features supports a seamless transition to newer UI components and ensures both performance and user engagement remain high throughout the application.

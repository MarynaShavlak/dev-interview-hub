## useArticlesScroll Hook

The `useArticlesScroll` hook is a custom React hook designed to handle scroll management within a list or grid view of articles. It provides a unified interface for controlling scroll positions, saving the current scroll state, and smoothly scrolling to the top of both list and grid views. This hook integrates with the Virtuoso library to manage virtualized scrollable components, optimizing performance and user experience when dealing with large sets of articles.

## Parameters

This hook does not take any parameters.

## Returns

An object with the following properties:

| Property                                    | Type                                  | Description                                                                                       |
|---------------------------------------------|---------------------------------------|---------------------------------------------------------------------------------------------------|
| `listRef`                          | `React.RefObject<VirtuosoHandle>`     | A reference to the Virtuoso list handle for controlling list scroll behavior.                     |
| `gridRef`                          | `React.RefObject<VirtuosoGridHandle>` | A reference to the Virtuoso grid handle for controlling grid scroll behavior.                     |
| `handleSaveArticlesPageScrollPosition`      | `(index: number) => () => void`       | Function to save the current article index as the scroll stop position.                           |
| `scrollStopArticleIndex`                    | `number`                              | The article index where the scroll stopped.                                                       |
| `scrollVirtuosoGridToTop`                   | `() => void`                          | Function to smoothly scroll the Virtuoso grid to the top.                                          |
| `scrollVirtuosoListToTop`                   | `() => void`                          | Function to smoothly scroll the Virtuoso list to the top.                                          |

## Internal Behavior

1. **References**:
    - **`listRef`**: A reference to the Virtuoso list handle for managing the scroll behavior of a list view.
    - **`gridRef`**: A reference to the Virtuoso grid handle for managing the scroll behavior of a grid view.

2. **State Management**:
    - **`useScrollStopArticleIndex`**: Retrieves the index of the article where scrolling was last stopped.

3. **Actions**:
    - **`useArticlesPageActions`**: Provides actions to update the scroll stop position.

4. **Callbacks**:
    - **`handleSaveArticlesPageScrollPosition`**: Updates the scroll stop position in the state based on the current article index.
    - **`scrollVirtuosoGridToTop`**: Smoothly scrolls the Virtuoso grid view to the top.
    - **`scrollVirtuosoListToTop`**: Smoothly scrolls the Virtuoso list view to the top.

## Usage Example

```typescript jsx
import { useArticlesScroll } from '@/features/scroll/useArticlesScroll';

const ArticleView = () => {
    const {
        listRef,
        gridRef,
        handleSaveArticlesPageScrollPosition,
        scrollStopArticleIndex,
        scrollVirtuosoGridToTop,
        scrollVirtuosoListToTop
    } = useArticlesScroll();

    // Example usage of the hook's functionalities
    return (
        <div>
            <button onClick={scrollVirtuosoListToTop}>Scroll List to Top</button>
            <button onClick={scrollVirtuosoGridToTop}>Scroll Grid to Top</button>
            <div ref={listRef} style={{ height: '500px', overflowY: 'auto' }}>
                {/* Render the Virtuoso list component */}
            </div>
            <div ref={gridRef} style={{ height: '500px', overflowY: 'auto' }}>
                {/* Render the Virtuoso grid component */}
            </div>
        </div>
    );
};
```

## Conclusion 
The `useArticlesScroll` hook provides a comprehensive solution for managing scroll behavior in article lists and grids within a React application. By encapsulating the logic for handling scroll positions and interactions with Virtuoso components, this hook simplifies the process of ensuring smooth and responsive scroll experiences. It streamlines the development workflow by offering a clear API for scroll management, thereby enhancing code maintainability and user experience in applications dealing with large sets of articles.

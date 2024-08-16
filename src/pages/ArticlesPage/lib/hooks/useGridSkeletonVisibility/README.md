## useGridSkeletonVisibility Hook

The `useGridSkeletonVisibility` hook is a custom React hook designed to determine whether the grid skeleton (loading placeholder) should be displayed based on the current view and loading state. This hook helps manage the visibility of loading indicators specific to grid layouts when articles are being fetched or when switching between views.

## Parameters

This hook does not take any parameters.

## Returns

- `boolean`: Returns `true` if the grid skeleton should be displayed; otherwise, returns `false`.

## Internal Behavior

1. **State Management**:
    - **`view`**: Retrieves the current view setting from `useArticlesPageView`. Determines if the view is set to grid mode (`ArticleView.GRID`).
    - **`isLoading`**: Retrieves the loading state from `useArticlesPageIsLoading`. Indicates whether articles are currently being loaded.
    - **`gridRef`**: Accesses the reference to the grid component from `useArticlesScroll`.

2. **Visibility Logic**:
    - **`isGridViewLayoutFirstRendering`**: Checks if the current view is `GRID`, the grid component is available, and articles are loading. This indicates that the grid is being rendered for the first time while loading.
    - **`isGridViewLayoutSwitching`**: Checks if the grid component is not available and articles are loading. This indicates that the view is switching to the grid layout while loading.
    - **`shouldShowGridSkeleton`**: Determines if the grid skeleton should be displayed based on whether it's the first rendering of the grid view or switching to the grid view.

## Usage Example

```typescript jsx
import { useGridSkeletonVisibility } from '@/lib/hooks/useGridSkeletonVisibility/useGridSkeletonVisibility';
import { GridSkeleton } from '@/components/GridSkeleton';
import { ArticleList } from '@/components/ArticleList';

const ArticlesPage = () => {
    const shouldShowGridSkeleton = useGridSkeletonVisibility();

    return (
        <div>
            {shouldShowGridSkeleton ? (
                <GridSkeleton />
            ) : (
                <ArticleList />
            )}
        </div>
    );
};
```

Conclusion
The `useGridSkeletonVisibility` hook provides a straightforward way to control the display of a grid skeleton (loading placeholder) based on the current view and loading state. By encapsulating this logic, the hook ensures that appropriate loading indicators are shown when switching to or rendering a grid layout, enhancing the user experience with clear and responsive feedback during data fetching.

# Documentation for Articles Page Selectors

## Overview
These selectors are designed to facilitate the retrieval of various states and configurations related to the articles page from the Redux store.
They simplify the access to loading states, errors, view modes, pagination, scroll position and other related data, enhancing the management and display of articles within the application.

## Import Statements
```typescript
import { StateSchema } from '@/app/providers/StoreProvider';
import {
    ArticleSortField,
    ArticleCategory,
    ArticleView,
} from '@/entities/Article';
import { buildSelector } from '@/shared/lib/store';
```
- `buildSelector`: A utility function for creating a selector that includes a hook for easier component integration.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.

## Selectors
### `useArticlesPageIsLoading` and `getArticlesPageIsLoading`
- **Purpose**: Retrieves the current loading status for the articles page.
- **Parameters**: `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticlesPageIsLoading`** | **`getArticlesPageIsLoading`** |
|-------------------|-------------------------------|--------------------------------|
| **Returns**       | Custom hook using `getArticlesPageIsLoading` to access loading status directly within React components. | Selector function that returns the `isLoading` status. |
| **Usage**         | Use in React components to get the loading status for the articles page. | Use in non-component code or server-side logic to retrieve the loading status. |

### `useArticlesPageError` and `getArticlesPageError`
- **Purpose**: Retrieves the current error state for the articles page.
- **Parameters**: `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticlesPageError`** | **`getArticlesPageError`** |
|-------------------|----------------------------|----------------------------|
| **Returns**       | Custom hook using `getArticlesPageError` to access the error directly within React components. | Selector function that returns the error state. |
| **Usage**         | Use in React components to display errors related to the articles page. | Use in non-component code or server-side operations to get the error state. |

### `useArticlesPageView` and `getArticlesPageView`
- **Purpose**: Retrieves the current view mode (e.g., grid or list) for the articles page.
- **Parameters**: `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticlesPageView`** | **`getArticlesPageView`** |
|-------------------|---------------------------|---------------------------|
| **Returns**       | Custom hook using `getArticlesPageView` to access the view mode directly within React components. | Selector function that returns the current view mode. |
| **Usage**         | Use in React components to adapt the UI based on the current view mode. | Use in non-component code to retrieve the current view mode setting. |

### `useArticlesPageNum` and `getArticlesPageNum`
- **Purpose**: Retrieves the current page number for the articles page.
- **Parameters**: `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticlesPageNum`** | **`getArticlesPageNum`** |
|-------------------|--------------------------|--------------------------|
| **Returns**       | Custom hook using `getArticlesPageNum` to access the current page number directly within React components. | Selector function that returns the page number. |
| **Usage**         | Use in React components to manage pagination based on the current page number. | Use in non-component code to get the page number for server-side or logic calculations. |

### `useArticlesPageLimit` and `getArticlesPageLimit`
- **Purpose**: Retrieves the limit of articles per page.
- **Parameters**: `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticlesPageLimit`** | **`getArticlesPageLimit`** |
|-------------------|----------------------------|----------------------------|
| **Returns**       | Custom hook using `getArticlesPageLimit` to access the limit directly within React components. | Selector function that returns the articles per page limit. |
| **Usage**         | Use in React components to manage article display based on the page limit. | Use in non-component code for calculations involving the articles per page limit. |

### `useArticlesPageHasMore` and `getArticlesPageHasMore`
- **Purpose**: Checks if there are more articles to load.
- **Parameters**: `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticlesPageHasMore`** | **`getArticlesPageHasMore`** |
|-------------------|-----------------------------|-----------------------------|
| **Returns**       | Custom hook using `getArticlesPageHasMore` to check if more articles are available directly within React components. | Selector function that returns a boolean indicating if more articles are available. |
| **Usage**         | Use in React components to determine if a load more button should be displayed. | Use in non-component code to decide on fetching additional articles or handling pagination. |

### `useArticlesPageInited` and `getArticlesPageInited`
- **Purpose**: Checks if the articles page has been initialized.
- **Parameters**: `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticlesPageInited`** | **`getArticlesPageInited`** |
|-------------------|-----------------------------|-----------------------------|
| **Returns**       | Custom hook using `getArticlesPageInited` to check initialization status directly within React components. | Selector function that returns the initialization status. |
| **Usage**         | Use in React components to handle logic that depends on whether the articles page has been initialized. | Use in non-component code for initialization checks and related logic. |

### `useArticlesPageOrder` and `getArticlesPageOrder`
- **Purpose**: Retrieves the current sorting order for the articles page (e.g., ascending or descending).
- **Parameters**: `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticlesPageOrder`** | **`getArticlesPageOrder`** |
|-------------------|----------------------------|----------------------------|
| **Returns**       | Custom hook using `getArticlesPageOrder` to access the sorting order directly within React components. | Selector function that returns the sorting order. |
| **Usage**         | Use in React components to sort articles based on the current order. | Use in non-component code for sorting logic or server-side operations. |

### `useArticlesPageSort` and `getArticlesPageSort`
- **Purpose**: Retrieves the current sorting field for the articles page.
- **Parameters**: `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticlesPageSort`** | **`getArticlesPageSort`** |
|-------------------|---------------------------|---------------------------|
| **Returns**       | Custom hook using `getArticlesPageSort` to access the sorting field directly within React components. | Selector function that returns the sorting field. |
| **Usage**         | Use in React components to sort articles based on the current field. | Use in non-component code for sorting logic or server-side operations. |

### `useArticlesPageSearch` and `getArticlesPageSearch`
- **Purpose**: Retrieves the current search query for the articles page.
- **Parameters**: `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticlesPageSearch`** | **`getArticlesPageSearch`** |
|-------------------|-----------------------------|-----------------------------|
| **Returns**       | Custom hook using `getArticlesPageSearch` to access the search query directly within React components. | Selector function that returns the search query. |
| **Usage**         | Use in React components to filter articles based on the search query. | Use in non-component code for search filtering or server-side operations. |

### `useArticlesPageCategory` and `getArticlesPageCategory`
- **Purpose**: Retrieves the current category filter for the articles page.
- **Parameters**: `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticlesPageCategory`** | **`getArticlesPageCategory`** |
|-------------------|------------------------------|------------------------------|
| **Returns**       | Custom hook using `getArticlesPageCategory` to access the category filter directly within React components. | Selector function that returns the category filter. |
| **Usage**         | Use in React components to filter articles based on the selected category. | Use in non-component code for category-based filtering or server-side logic. |


### `useScrollStopArticleIndex` and `getScrollStopArticleIndex`
- **Purpose**: Retrieves the index of the last article viewed by the user, allowing the application to resume from the same position when revisiting the page.
- **Parameters**: `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useScrollStopArticleIndex`** | **`getScrollStopArticleIndex`** |
|-------------------|------------------------------|------------------------------|
| **Returns**       | Custom hook returning the index of the last article viewed.| Selector function returning the index of the last article viewed. |
| **Usage**         | Use in React components to manage scroll positions and continue reading from where the user left off. | Use in non-component code or server-side logic to manage scroll position. |


## Usage Examples
## Example 1: `useArticlesPageView` in Component
```typescript jsx
import { useArticlesPageView } from '@/pages/ArticlesPage';

export function ArticlesViewComponent() {
    const view = useArticlesPageView();

    return (
        <div className={view === ArticleView.GRID ? 'grid-view' : 'list-view'}>
            {/* Render articles based on the view mode */}
        </div>
    );
}
```

## Example 2: Accessing `getArticleDetailsData` in async thunk
```typescript jsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArticlesPageNum } from '@/pages/ArticlesPage';

export const fetchArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
    >('articlesPage/fetchArticlesPage', async (_, thunkApi) => {
    const { getState } = thunkApi;
    const pageNum = getArticlesPageNum(getState());

    try {
        const response = await fetch(`/api/articles?page=${pageNum}`);
        // Handle response
    } catch (error) {
        // Handle error
    }
});
```

## Conclusion

These selectors provide a comprehensive approach to managing and accessing various states related to the articles page, including loading statuses, errors, view modes, pagination and scroll positions. Utilizing these selectors ensures streamlined data retrieval and enhances the user experience by maintaining consistent and efficient state management.





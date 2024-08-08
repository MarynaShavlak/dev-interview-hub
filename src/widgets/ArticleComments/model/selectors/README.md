# Documentation for Article Comments Selectors

## Overview
These selectors are designed to access and manage the loading state and errors related to article comments from the Redux store. They simplify the process of retrieving comment-specific information, loading states, and errors, making it easier to manage and display comment content within the application.

## Import Statements
```typescript
import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';
```
- `buildSelector`: A utility function for creating a selector that includes a hook for easier component integration.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.

## Selectors

### `useArticleCommentsIsLoading` and `getArticleCommentsIsLoading`

- **Purpose**:  Provides the current loading status for article comments.
- **Parameters**:  `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticleCommentsIsLoading`** | **`getArticleCommentsIsLoading`** |
|-------------------|---------------------------------|---------------------------------|
| **Returns**       | Custom hook using `getArticleCommentsIsLoading` to obtain loading status directly within React components. |  Selector function retrieving the `isLoading` status. |
| **Usage**         | Use in React components to access loading status directly from the Redux store. |  Use in non-component code or server-side logic to access the loading status. |

### `useArticleCommentsError` and `getArticleCommentsError`

- **Purpose**:  Retrieves the current article comments error from the Redux store.
- **Parameters**:  `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticleCommentsError`** | **`getArticleCommentsError`** |
|-------------------|------------------------------|------------------------------|
| **Returns**       |  Custom hook using `getArticleCommentsError` to retrieve article comments error directly within React components. | Selector function returning article comments error.|
| **Usage**         |  Use in React components to access article comments error directly from the Redux store. |  Use in non-component code or server-side operations to access article comments error.|

## Usage Examples
## Example 1: `useArticleCommentsIsLoading` in Component
```typescript jsx
import { useArticleCommentsIsLoading } from '@/entities/Article';

export function CommentsLoadingIndicator() {
    const isLoading = useArticleCommentsIsLoading();

    return (
        <div>
            {isLoading ? (
                <p>Loading comments...</p>
            ) : (
                <p>Comments loaded.</p>
            )}
        </div>
    );
}
```

## Example 2: `useArticleCommentsError` in Component
```typescript jsx
import { useArticleCommentsError } from '@/entities/Article';

export function CommentsErrorIndicator() {
    const error = useArticleCommentsError();

    return (
        <div>
            {error ? (
                <p>Error loading comments: {error}</p>
            ) : (
                <p>No errors loading comments.</p>
            )}
        </div>
    );
}
```

## Conclusion
These selectors and hooks provide a structured approach to managing and accessing the loading states and errors of article comments. By utilizing these utilities, you ensure efficient data retrieval and handling, contributing to a smoother and more reliable user experience in your application.

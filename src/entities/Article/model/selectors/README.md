# Documentation for Article Details Selectors

## Overview
These selectors are crafted to access and manage article details from the Redux store. They simplify the retrieval of article-specific information, loading states, and errors related to article details, making it easier to manage and display article content within the application.

## Import Statements
```typescript
import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';
```
- `buildSelector`: A utility function for creating a selector that includes a hook for easier component integration.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.
- `ArticleSortField`: An enum defining the possible fields by which articles can be sorted.
- `ArticleCategory`: An enum specifying the categories available for filtering articles.
- `ArticleView`: An enum defining the possible view modes for displaying article.



## Selectors

### `useArticleDetailsData` and `getArticleDetailsData`
- **Purpose**:  Retrieves the current article details data from the Redux store.
- **Parameters**:  `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticleDetailsData`** | **`getArticleDetailsData`** |
|-------------------|-----------------------------|-----------------------------|
| **Returns**       |  Custom hook using `getArticleDetailsData` to retrieve article details directly within React components. |  Selector function returning article details data. |
| **Usage**         | Use in React components to access article data directly from the Redux store. |  Use in non-component code or server-side operations to access article data |


### `useArticleDetailsIsLoading` and `getArticleDetailsIsLoading`

- **Purpose**:  Provides the current loading status for article details.
- **Parameters**:  `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticleDetailsIsLoading`** | **`getArticleDetailsIsLoading`** |
|-------------------|---------------------------------|---------------------------------|
| **Returns**       | Custom hook using `getArticleDetailsIsLoading` to obtain loading status directly within React components. |  Selector function retrieving the `isLoading` status. |
| **Usage**         | Use in React components to access loading status directly from the Redux store. |  Use in non-component code or server-side logic to access the loading status. |

### `useArticleDetailsError` and `getArticleDetailsError`

- **Purpose**:  Retrieves the current article details error from the Redux store.
- **Parameters**:  `state`: The entire Redux store state, adhering to the `StateSchema` type.

| **Aspect**        | **`useArticleDetailsError`** | **`getArticleDetailsError`** |
|-------------------|------------------------------|------------------------------|
| **Returns**       |  Custom hook using `getArticleDetailsError` to retrieve article error directly within React components. | Selector function returning article details error.|
| **Usage**         |  Use in React components to access article error directly from the Redux store. |  Use in non-component code or server-side operations to access article error. |

## Usage Examples
## Example 1: `useArticleDetailsData` in Component
```typescript jsx
import { useArticleDetailsData } from '@/entities/Article';

export function ArticleDetailComponent() {
    const articleData = useArticleDetailsData();

    return (
        <div>
            {articleData ? (
                <h1>{articleData.title}</h1>
            ) : (
                <p>Loading article...</p>
            )}
        </div>
    );
}
```

## Example 2: Accessing `getArticleDetailsData` in async thunk
```typescript jsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { getArticleDetailsData } from '@/entities/Article';
import { fetchCommentsByArticleIdThunk } from '../../services/fetchCommentsByArticleIdThunk/fetchCommentsByArticleIdThunk';

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
    >('articleDetails/addCommentForArticle', async (text, thunkApi) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkApi;

    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
        return rejectWithValue('no data');
    }

    try {
        const response = await extra.api.post<Comment>('/comments', {
            articleId: article.id,
            userId: userData.id,
            text,
        });

        if (!response.data) {
            throw new Error();
        }

        dispatch(fetchCommentsByArticleIdThunk(article.id));

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
```

## Conclusion
These selectors and hooks provide a structured approach to managing and accessing article details, loading states, and errors. By utilizing these utilities, you ensure efficient data retrieval and handling, contributing to a smoother and more reliable user experience in your application.

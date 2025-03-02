#  `fetchArticleByIdThunk` Thunk Documentation

The `fetchArticleByIdThunk` thunk is an asynchronous action designed to fetch an article by its ID from the backend. This thunk leverages the createAsyncThunk function from Redux Toolkit to handle the asynchronous logic and state management.

## Parameters

| Parameter  | Type                    | Description                                     |
|------------|-------------------------|-------------------------------------------------|
| `articleId`   | `string` or `undefined` | TThe unique identifier of the article to be fetched. If undefined, the thunk will reject with an error. |
| `thunkAPI`   | `ThunkAPI`              | The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more. |


## Returns

`Promise<Article>`: 
- **On Success**: Resolves to the article data object containing the article details fetched from the backend.
- **On Error**: If the fetch operation fails, the promise is rejected with an error message **'Failed to fetch article.'**.


## Internal Behavior
1. **Parameter Validation**: Checks if the `articleId` is defined. If not, it throws an error stating that the article ID is required.
2. **API Call**: Makes an asynchronous GET request to the **'/articles/${articleId}'** endpoint using the `extra.api` object, with the parameter `_expand` set to `user`.
3. **Response Handling**: Checks if the response contains data. If no data is returned, it throws an error indicating that the article was not found.
4. **Return Data**: If the response is successful and contains data, it returns the article data.

## Error Handling

The thunk catches and handles errors during the fetch process. If an error occurs, it logs the error to the console and returns a rejected promise with the message **'Failed to fetch article.'**. 
This ensures that any issues during the data fetch can be identified and addressed promptly.

## Usage Example
The following example demonstrates how to use the `fetchArticleByIdThunk` thunk in a React component to fetch and display profile data.

```typescript jsx
import { memo } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchArticleByIdThunk } from '../../model/services/fetchArticleByIdThunk/fetchArticleByIdThunk';

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchArticleByIdThunk(id));
        }
    });

    return (
        <div className={className}>
            {/* Add your component's rendering logic here */}
        </div>
    );
});
```

## Conclusion 
The `fetchArticleByIdThunk` thunk provides a reliable mechanism for fetching article data from the backend using an article ID. It handles the asynchronous API call, processes the response, and manages errors effectively. This thunk is essential for components that require dynamic article data retrieval, ensuring a seamless user experience with proper error handling and state management.

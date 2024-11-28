# `fetchCommentsByArticleIdThunk` Thunk Documentation

The `fetchCommentsByArticleIdThunk` thunk is an asynchronous action designed to retrieve comments associated with a specific article from the backend. This thunk utilizes the `createAsyncThunk` function from Redux Toolkit to handle asynchronous logic and state management.

## Parameters

| Parameter   | Type                    | Description                                                                                       |
|-------------|-------------------------|---------------------------------------------------------------------------------------------------|
| `articleId` | `string` or `undefined` | The unique identifier of the article for which comments are to be fetched. If undefined, the thunk will reject with an error. |
| `thunkAPI`  | `ThunkAPI`              | The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more.    |

## Returns

`Promise<Comment[]>`:
- **On Success**: Resolves to an array of comment objects associated with the specified article ID.
- **On Error**: If the fetch operation fails or the article ID is not provided, the promise is rejected with an error message **'Failed to fetch comments.'**.

## Internal Behavior
1. **Parameter Validation**: Checks if the `articleId` is defined. If not, it returns a rejection with an error message indicating that the article ID is required.
2. **API Call**: Makes an asynchronous GET request to the **'/comments'** endpoint using the `extra.api` object, with the query parameter `articleId` and `_expand` set to `user` for additional user details.
3. **Response Handling**: Validates the response data. If the response does not contain any data, it returns a rejection indicating that no comments were found.
4. **Return Data**: If the response is successful and contains data, it returns the array of comments.

## Error Handling

The thunk handles errors during the fetch process by catching exceptions and logging them to the console. It returns a rejected promise with the message **'Failed to fetch comments.'** if an error occurs. This approach ensures that any issues during data retrieval are managed effectively and provides clarity on potential issues.

## Usage Example

The following example demonstrates how to use the `fetchCommentsByArticleIdThunk` thunk in a React component to fetch and display comments.

```typescript jsx
import { memo } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleIdThunk } from '../../model/services/fetchCommentsByArticleIdThunk/fetchCommentsByArticleIdThunk';

interface CommentsListProps {
    className?: string;
    articleId?: string;
}

export const CommentsList = memo(({ className, articleId }: CommentsListProps) => {
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        if (articleId) {
            dispatch(fetchCommentsByArticleIdThunk(articleId));
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
The `fetchCommentsByArticleIdThunk` thunk provides a robust mechanism for fetching comments associated with an article. It manages the asynchronous API call, processes the response data, and handles errors effectively. This thunk is crucial for components that need to display or interact with comments related to a specific article, ensuring a smooth user experience and accurate data retrieval.

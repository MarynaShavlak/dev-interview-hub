# `addCommentForArticle` Thunk Documentation

The `addCommentForArticle` thunk is an asynchronous action designed to add a new comment to a specific article. This thunk uses the `createAsyncThunk` function from Redux Toolkit to handle the asynchronous logic and manage state updates. It ensures that the comment is added only if the necessary data is available and handles scenarios where the data might be missing or the API request fails.

## Parameters

| Parameter   | Type           | Description                                                                                          |
|-------------|----------------|------------------------------------------------------------------------------------------------------|
| `text`      | `string`       | The content of the comment to be added. If the text is empty or undefined, the thunk will reject with an error. |
| `thunkAPI`  | `ThunkAPI`     | The thunkAPI object provided by Redux Toolkit, which includes dispatch, getState, extra, and more.   |

## Returns

`Promise<Comment>`:
- **On Success**: Resolves to the newly added comment object.
- **On Error**: If the comment addition fails due to missing data or API issues, the promise is rejected with an error message **'Failed to add comment.'**.

## Internal Behavior
1. **Data Validation**: Checks if user data, the article, and the comment text are available. If any of these are missing, it returns a rejection with an error message stating **'Required data is missing.'**.
2. **API Call**: Makes an asynchronous POST request to the **'/comments'** endpoint using the `extra.api` object. The request payload includes `articleId`, `userId`, and the comment text.
3. **Response Handling**: Validates the response from the API. If no data is returned, it rejects with an error message **'No data received from API.'**.
4. **State Update**: On should handle successful response, dispatches `fetchCommentsByArticleIdThunk` to refresh the comments list for the article.
5. **Return Data**: If successful, returns the newly added comment.

## Error Handling

The thunk handles errors during the comment addition process by catching exceptions and logging them to the console. It returns a rejected promise with the message **'Failed to add comment.'** if an error occurs. This ensures that any issues during the comment submission are managed effectively, providing clarity on potential problems.

## Usage Example

The following example demonstrates how to use the `addCommentForArticle` thunk in a React component to add a comment:

```typescript jsx
import { memo, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';

interface AddCommentFormProps {
    articleId: string;
}

export const AddCommentForm = memo(({ articleId }: AddCommentFormProps) => {
    const dispatch = useAppDispatch();
    const [commentText, setCommentText] = useState('');

    const handleSubmit = () => {
        if (commentText) {
            dispatch(addCommentForArticle(commentText));
            setCommentText('');
        }
    };

    return (
        <div>
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handleSubmit}>Add Comment</button>
        </div>
    );
});
```

## Conclusion
The `addCommentForArticle` thunk provides a reliable mechanism for adding comments to an article. It manages the asynchronous API call, processes the response data, and handles errors effectively. This thunk is essential for components that allow users to submit comments, ensuring a smooth user experience and proper data management.

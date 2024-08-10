# `fetchArticleRecommendations` Thunk Documentation

The `fetchArticleRecommendations` thunk is an asynchronous action designed to retrieve a list of recommended articles from the backend. This thunk utilizes the `createAsyncThunk` function from Redux Toolkit to handle asynchronous logic and state management.

## Parameters

| Parameter | Type                | Description                                                                                  |
|-----------|---------------------|----------------------------------------------------------------------------------------------|
| `_`       | `void`              | This thunk does not require any parameters.                                                  |
| `thunkAPI`| `ThunkAPI`          | The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more. |

## Returns

`Promise<Article[]>`:
- **On Success**: Resolves to an array of article objects representing recommended articles.
- **On Error**: If the fetch operation fails or no recommendations are found, the promise is rejected with an error message **'Failed to fetch article recommendations.'**.

## Internal Behavior
1. **API Call**: Makes an asynchronous GET request to the **'/articles'** endpoint using the `extra.api` object, with a query parameter `_limit` set to `3` to limit the number of recommended articles retrieved.
2. **Response Handling**: Checks if the response data is valid. If the response does not contain any data, it returns a rejection indicating that no article recommendations were found.
3. **Return Data**: If the response is successful and contains data, it returns the array of recommended articles.

## Error Handling

The thunk handles errors during the fetch process by catching exceptions and logging them to the console. It returns a rejected promise with the message **'Failed to fetch article recommendations.'** if an error occurs. This approach ensures that any issues during data retrieval are managed effectively and provides clarity on potential issues.

## Usage Example

The following example demonstrates how to use the `fetchArticleRecommendations` thunk in a React component to fetch and display recommended articles.

```typescript jsx
import { memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations';
import { selectArticleRecommendations } from '../../model/selectors/articleRecommendationsSelectors';

interface RecommendationsListProps {
    className?: string;
}

export const RecommendationsList = memo(({ className }: RecommendationsListProps) => {
    const dispatch = useAppDispatch();
    const recommendations = useAppSelector(selectArticleRecommendations);

    useEffect(() => {
        dispatch(fetchArticleRecommendations());
    }, [dispatch]);

    return (
        <div className={className}>
            {recommendations.length > 0 ? (
                recommendations.map(article => (
                    <div key={article.id}>
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                    </div>
                ))
            ) : (
                <p>No recommendations available.</p>
            )}
        </div>
    );
});
```
## Conclusion
The `fetchArticleRecommendations` thunk provides a robust mechanism for fetching a list of recommended articles. It manages the asynchronous API call, processes the response data, and handles errors effectively. This thunk is crucial for components that need to display or interact with article recommendations, ensuring a smooth user experience and accurate data retrieval.

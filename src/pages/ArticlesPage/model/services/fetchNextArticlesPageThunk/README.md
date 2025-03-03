# `fetchNextArticlesPageThunk` Thunk Documentation

The `fetchNextArticlesPageThunk` thunk is an asynchronous action designed to load the next page of articles if more pages are available. This thunk uses the `createAsyncThunk` function from Redux Toolkit to manage the asynchronous logic and state updates related to paginated article retrieval.

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `_`       | `void` | This thunk does not use any arguments. |
| `thunkAPI`| `ThunkAPI` | The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more. |

## Returns

`Promise<void>`:
- **On Success**: Resolves when the next page of articles is successfully fetched and added to the state.
- **On Error**: The thunk does not explicitly handle errors or return an error message, but issues in the `fetchArticlesListThunk` thunk would affect the outcome.

## Internal Behavior

1. **State Retrieval**: Checks the current state to determine if there are more articles to load (`hasMore`), if articles are currently being loaded (`isLoading`), and the current page number.
2. **Condition Check**: If more articles are available and no articles are currently being loaded, the thunk proceeds to the next step.
3. **Page Update**: Increments the current page number in the state by dispatching `articlesPageActions.setPage` with the updated page number.
4. **Fetch Next Page**: Dispatches the `fetchArticlesListThunk` thunk to load articles for the next page.

## Error Handling

The thunk does not explicitly handle errors. If the `fetchArticlesListThunk` thunk encounters issues, such as network errors or API failures, those errors will affect the overall fetching process.

## Usage Example

The following example demonstrates how to use the `fetchNextArticlesPageThunk` thunk in a React component to fetch and display additional articles as users scroll.

```typescript jsx
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { fetchNextArticlesPageThunk } from '../../model/services/fetchNextArticlesPageThunk/fetchNextArticlesPageThunk';
import { selectArticles, selectHasMore, selectIsLoading } from '../../model/selectors/articlesPageSelectors';

const ArticlesList = () => {
    const dispatch = useAppDispatch();
    const articles = useAppSelector(selectArticles);
    const hasMore = useAppSelector(selectHasMore);
    const isLoading = useAppSelector(selectIsLoading);

    const loadMoreArticles = useCallback(() => {
        if (!isLoading && hasMore) {
            dispatch(fetchNextArticlesPageThunk());
        }
    }, [dispatch, isLoading, hasMore]);

    return (
        <div>
            {articles.map(article => (
                <div key={article.id}>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                </div>
            ))}
            {isLoading && <p>Loading more articles...</p>}
            {hasMore && !isLoading && (
                <button onClick={loadMoreArticles}>Load More</button>
            )}
        </div>
    );
};

export default ArticlesList;
```

## Conclusion
The `fetchNextArticlesPageThunk` thunk facilitates paginated article retrieval by fetching additional pages when more articles are available and the current page is not already loading. It provides an efficient way to handle pagination in applications displaying large sets of articles, ensuring that users can load more content seamlessly while managing the state and loading indicators effectively.

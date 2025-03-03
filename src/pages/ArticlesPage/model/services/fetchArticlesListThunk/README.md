# `fetchArticlesListThunk` Thunk Documentation

The `fetchArticlesListThunk` thunk is an asynchronous action designed to retrieve a list of articles from the backend, applying various filters and settings based on the current state in the Redux store. This thunk utilizes the `createAsyncThunk` function from Redux Toolkit to manage the asynchronous operation and state updates.

## Parameters

| Parameter        | Type                      | Description                                                                                       |
|------------------|---------------------------|---------------------------------------------------------------------------------------------------|
| `props`          | `FetchArticlesListProps`  | Optional properties to customize the request.                                                    |
| - `replace`      | `boolean`                 | If true, the existing articles list will be replaced with the new one. Defaults to `false`.       |
| `thunkAPI`       | `ThunkAPI`                | The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more.    |

## Returns

`Promise<Article[]>`:
- **On Success**: Resolves to an array of article objects based on the current settings and filters.
- **On Error**: If the fetch operation fails or if no articles are found, the promise is rejected with an error message **'Failed to fetch articles.'** or **'No articles found.'**.

## Internal Behavior

1. **Parameter Handling**: The thunk takes optional `props` to determine if the existing articles list should be replaced.
2. **State Retrieval**: Retrieves current page settings and filters from the Redux store, including limit, sort, order, search query, page number, and category.
3. **API Call**: Constructs the API request URL with query parameters derived from the current state and makes an asynchronous GET request to the **'/articles'** endpoint using the `extra.api` object. Includes parameters like `_expand`, `_limit`, `_page`, `_sort`, `_order`, `q`, and `category`.
4. **Response Handling**: Validates the response data. If the response does not contain any data, it returns a rejection indicating that no articles were found.
5. **Return Data**: If the response is successful and contains data, it returns the array of articles.

## Error Handling

The thunk catches exceptions during the fetch process and logs them to the console. It returns a rejected promise with an appropriate message if an error occurs or if no articles are found. This ensures that issues during data retrieval are handled gracefully and provides clear feedback on potential problems.

## Usage Example

The following example demonstrates how to use the `fetchArticlesListThunk` thunk in a React component to fetch and display a list of articles.

```typescript jsx
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { fetchArticlesListThunk } from '../../model/services/fetchArticlesListThunk/fetchArticlesListThunk';
import { selectArticles } from '../../model/selectors/articlesPageSelectors';

const ArticlesList = () => {
    const dispatch = useAppDispatch();
    const articles = useAppSelector(selectArticles);

    useEffect(() => {
        dispatch(fetchArticlesListThunk({ replace: true }));
    }, [dispatch]);

    return (
        <div>
            {articles.length > 0 ? (
                articles.map(article => (
                    <div key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.content}</p>
                    </div>
                ))
            ) : (
                <p>No articles found.</p>
            )}
        </div>
    );
};

export default ArticlesList;
```
## Conclusion
The `fetchArticlesListThunk` thunk is essential for retrieving a filtered list of articles based on various settings and parameters. It effectively manages the asynchronous API call, processes the response data, and handles errors, ensuring reliable and efficient data retrieval for components that display or interact with articles. This thunk provides flexibility for integrating article lists into React components, enhancing the user experience with accurate and up-to-date information.

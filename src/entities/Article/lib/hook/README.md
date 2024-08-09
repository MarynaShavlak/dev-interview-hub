## `useArticleDetails` Hook

A custom React hook for managing the state and fetching of article details based on a unique article ID. This hook integrates with Redux to handle the fetching process and provides information about the loading state and any errors encountered.

### Parameters

- `id` (string): The unique identifier of the article to be fetched.

### Returns

An object with the following properties:

| Property    | Type                         | Description                                                            |
|-------------|------------------------------|------------------------------------------------------------------------|
| `article`   | `object`           or `null` | The details of the fetched article. This will be `null` if the article has not been fetched yet. |
| `isLoading` | `boolean`                    | A boolean indicating whether the article details are currently being fetched. |
| `error`     | `object` or `null`           | An error object if an error occurred during the fetch operation, or `null` otherwise. |

### Internal Behavior

- **Selectors**:
    - **`useArticleDetailsData`**: Retrieves the article details from the Redux store.
    - **`useArticleDetailsIsLoading`**: Retrieves the loading state of the article details from the Redux store.
    - **`useArticleDetailsError`**: Retrieves any error state related to fetching article details from the Redux store.

- **Actions**:
    - **`fetchArticleById`**: The action dispatched to fetch article details from the server.

- **Effect**:
    - **`useInitialEffect`**: Executes the fetch action when the component mounts, ensuring the article details are loaded when the hook is first used.

### Usage Example

```typescript jsx
import { useArticleDetails } from './hooks/useArticleDetails';

const ArticleDetails = ({ id }) => {
  const { article, isLoading, error } = useArticleDetails(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: Unable to fetch article details</div>;
  if (!article) return <div>No article found</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};
```


## Conclusion
The `useArticleDetails` hook simplifies the process of fetching and managing article details by abstracting the fetching logic and state management. It provides a clear and reusable interface for accessing article data, handling loading states, and managing errors. This approach enhances modularity and maintains a clean separation of concerns in React components.

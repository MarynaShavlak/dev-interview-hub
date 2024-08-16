## `useArticleListFetcher` Hook

The `useArticleListFetcher` hook is a custom React hook designed to manage and encapsulate the logic for initializing and loading articles on a page. It abstracts the data fetching and state management logic related to the articles page, allowing components to focus on rendering and user interactions.

### Parameters

This hook does not take any parameters.

### Returns

An object with the following properties:

| Property            | Type                    | Description                                                                                               |
|---------------------|-------------------------|-----------------------------------------------------------------------------------------------------------|
| `onLoadNextPart`    | `() => void`            | Function to handle the loading of the next page of articles when the user scrolls to the end.            |
| `searchParams`      | `URLSearchParams`       | The current URL search parameters, which can be used to initialize the articles page or for filtering.    |

### Internal Behavior

1. **State Management**:
    - **`useAppDispatch`**: Provides access to the Redux dispatch function to trigger actions.
    - **`useSearchParams`**: Retrieves the current URL search parameters for initializing the articles page.

2. **Action Dispatching**:
    - **`fetchNextArticlesPage`**: A service function dispatched to fetch the next set of articles when the user scrolls to the end.
    - **`initArticlesPage`**: A service function dispatched to initialize the articles page with the current search parameters.

3. **Callbacks**:
    - **`onLoadNextPart`**: A callback function that triggers the `fetchNextArticlesPage` action to load more articles. It is memoized to avoid unnecessary re-renders.

4. **Effects**:
    - **`useInitialEffect`**: A custom hook that runs the `initArticlesPage` action when the component mounts, using the current search parameters.

### Usage Example

```typescript jsx
export const ArticlesPage = ({ className }: ArticlesPageProps) => {
   const { onLoadNextPart } = useArticleListFetcher();
   return (
           <StickyContentLayout
                   left={<ViewSelectorContainer />}
                   right={<FiltersContainer />}
                   content={
                      <Page
                              data-testid="ArticlesPage"
                              onScrollEnd={onLoadNextPart}
                              className={className}
                      >
                         <RedesignedArticleInfiniteList />
                         <ArticlePageGreeting />
                      </Page>
                   }
           />
   );
};
```

## Conclusion 
The `useArticleListFetcher` hook simplifies the management of article data fetching and initialization by encapsulating the related logic. It provides a clean API for components to load more articles and handle page initialization, ensuring a consistent and maintainable approach to managing article pages. By abstracting these details into a hook, the code remains organized and focused, improving both readability and maintainability.

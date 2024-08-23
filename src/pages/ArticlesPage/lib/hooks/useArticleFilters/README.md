## useArticleFilters Hook
The `useArticleFilters` hook is a custom React hook designed to manage and interact with article filtering state within an application. It consolidates various filter-related selectors and actions into a unified API, allowing components to easily access and update filters for sorting, ordering, searching, and categorizing articles. This hook ensures a responsive and consistent user experience by providing mechanisms to update filters and trigger data fetches accordingly.

## Parameters
This hook does not take any parameters.

## Returns
An object with the following properties:

| Property             | Type                  | Description                                           |
|----------------------|-----------------------|-------------------------------------------------------|
| `view`               | `ArticleView`         | The current view setting for displaying articles.     |
| `sort`               | `ArticleSortField`    | The current sort field used for ordering articles.    |
| `order`              | `SortOrder`           | The current sort order (ascending or descending).     |
| `search`             | `string`              | The current search query used for filtering articles. |
| `category`           | `ArticleCategory`     | The currently selected article category for filtering. |
| `onChangeView`       | `(view: ArticleView) => void` | Function to update the article view setting, adjust the limit based on the view,store the view in local storage, reset the page, and fetch data.                                                      |
| `onChangeSort`       | `(newSort: ArticleSortField) => void` | Function to update the article sort field.            |
| `onChangeOrder`      | `(newOrder: SortOrder) => void` | Function to update the article sort order.            |
| `onChangeSearch`     | `(search: string) => void` | Function to update the search query.                  |
| `onChangeCategory`   | `(value: ArticleCategory) => void` | Function to update the selected article category.     |

## Internal Behavior

1. **State Management**:
   - **`useArticlesPageView`**: Retrieves the current view setting for articles.
   - **`useArticlesPageSort`**: Retrieves the current sort field for articles.
   - **`useArticlesPageOrder`**: Retrieves the current sort order for articles.
   - **`useArticlesPageSearch`**: Retrieves the current search query for articles.
   - **`useArticlesPageCategory`**: Retrieves the currently selected article category.

2. **Action Dispatching**:
   - **`useArticlesPageActions`**: Provides actions to update filtering criteria such as view, sort, order, search, and category.
   - **`fetchArticlesList`**: A service function used to fetch the list of articles based on current filters.

3. **Debouncing**:
   - **`useDebounce`**: Applies a debounce to the fetchData function to optimize performance by delaying execution until the user stops typing.

4. **Callbacks**:
   - **`onChangeView`**: Updates the article view setting, sets the limit based on the view,stores the view in local storage, resets the page to 1, and triggers a data fetch.
   - **`onChangeSort`**: Updates the sort field, resets the page to 1, and triggers a data fetch.
   - **`onChangeOrder`**: Updates the sort order, resets the page to 1, and triggers a data fetch.
   - **`onChangeSearch`**: Updates the search query, resets the page to 1, and triggers a debounced data fetch.
   - **`onChangeCategory`**: Updates the search query, resets the page to 1, and triggers a debounced data fetch.

## Usage Example
```typescript jsx
import { useArticleFilters } from '@/features/filters/useArticleFilters';

const ArticleList = () => {
   const {
      view,
      sort,
      order,
      search,
      category,
      onChangeView,
      onChangeSort,
      onChangeOrder,
      onChangeSearch,
      onChangeCategory
   } = useArticleFilters();

   return (
           <div>
              <select onChange={(e) => onChangeView(e.target.value as ArticleView)} value={view}>
                 {/* Options for different views */}
              </select>
              <select onChange={(e) => onChangeSort(e.target.value as ArticleSortField)} value={sort}>
                 {/* Options for sorting fields */}
              </select>
              <select onChange={(e) => onChangeOrder(e.target.value as SortOrder)} value={order}>
                 {/* Options for sort order */}
              </select>
              <input
                      type="text"
                      value={search}
                      onChange={(e) => onChangeSearch(e.target.value)}
                      placeholder="Search articles"
              />
              <select onChange={(e) => onChangeCategory(e.target.value as ArticleCategory)} value={category}>
                 {/* Options for article categories */}
              </select>
              {/* Render the list of articles based on the current filters */}
           </div>
   );
};
```

## Conclusion
The `useArticleFilters` hook provides a streamlined approach for managing article filtering within a React application. It encapsulates the logic for handling various filter criteria and actions, offering a clear and concise API for components to interact with. By abstracting the filter management logic, this hook simplifies the development process and enhances code maintainability, ensuring a responsive and consistent experience when working with article lists.

## useArticleRating Hook
A custom React hook designed to manage the rating and feedback functionality for articles. It simplifies the process of fetching the current rating, submitting a new rating, and providing feedback for a specific article.

## Parameters
- `articleId`: A string representing the unique identifier of the article for which the rating is being managed.

## Returns
An object with the following properties:

| Property           | Type             | Description                                                                                  |
|--------------------|------------------|----------------------------------------------------------------------------------------------|
| `rating`           | `object`         | The current rating data for the article, or `undefined` if not yet loaded.                   |
| `isLoading`        | `boolean`        | Indicates whether the rating data is currently being fetched.                                |
| `error`            | `object` or `null` | An error object if an error occurred while fetching the rating data, or `null` otherwise.    |
| `onSubmitFeedback` | `(starsCount: number, feedback?: string) => void`       | Function to handle the submission of a rating along with feedback.                           |
| `onSubmitRating`   | `(starsCount: number) => void`       | Function to handle the submission of a rating without feedback.                              |

## Internal Behavior
1. **Data Fetching**:
   - **`useGetArticleRating`**: Fetches the current rating for the article from the API, using `articleId` and `userId` as parameters.

2. **Mutation Handling**:
   - **`useRateArticle`**: Provides a mutation function to submit a new rating and optional feedback to the API.

3. **Callbacks**:
   - **`handleRateArticle`**: A memoized function using `useCallback` to handle the rating submission. It tries to call the `rateArticleMutation` with the necessary parameters.
   - **`onSubmitFeedback`**: Calls `handleRateArticle` with both the rating and feedback.
   - **`onSubmitRating`**: Calls `handleRateArticle` with only the rating.

## Usage Example
```typescript jsx
import { useArticleRating } from '../../lib/hook/useArticleRating';

export const ArticleRating = ({ articleId }) => {
   const { rating, isLoading, error, onSubmitFeedback, onSubmitRating } = useArticleRating(articleId);

   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>Error loading rating</div>;

   const handleRating = (starsCount) => {
      onSubmitRating(starsCount);
   };

   const handleFeedback = (starsCount, feedback) => {
      onSubmitFeedback(starsCount, feedback);
   };

   return (
           <div>
              <div>Current Rating: {rating?.rate || 'No rating yet'}</div>
              <div>
                 <button onClick={() => handleRating(5)}>Rate 5 Stars</button>
                 <button onClick={() => handleFeedback(4, 'Great article!')}>Rate 4 Stars with Feedback</button>
              </div>
           </div>
   );
};
```

## Conclusion
The `useArticleRating` hook facilitates the management of article ratings and feedback by providing an easy-to-use interface for fetching current ratings, submitting new ratings, and handling feedback. This hook abstracts the complexities of API interactions, allowing developers to focus on building user-friendly rating interfaces.

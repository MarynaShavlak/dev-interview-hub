# `articleRatingApi`: API Documentation

## Overview

The `articleRatingApi` is a set of endpoints created using `rtkApi` for managing article ratings.
This API allows users to fetch and submit ratings for articles, enabling personalized content feedback.

## Description
The `articleRatingApi` includes two primary endpoints:
- `getArticleRating`: A **query** endpoint to retrieve the ratings for a specific article by a specific user.
- `rateArticle`: A **mutation** endpoint to submit or update a rating for a specific article by a specific user.

These endpoints leverage Redux Toolkit Query for efficient data fetching and state management, ensuring a seamless user experience.

### Import Details
- `rtkApi`: The base API service from **'@/shared/api/rtkApi'**.
- `RatingData`: The type definition for article ratings from **'@/entities/Rating'**.

###  Parameters
`getArticleRating` Query expects an object containing the following properties:

| Parameter  | Type              | Description                                                                                                                       |
|------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `userId`   | `string`          | The unique identifier of the user whose rating is to be retrieved.                                                                                                                                  |
| `articleId` | `string` | The unique identifier of the article for which the rating is to be retrieved. |


`rateArticle` Mutation expects an object containing the following properties:

| Parameter   | Type     | Description                                                                                                                       |
|-------------|----------|-----------------------------------------------------------------------------------------------------------------------------------|
| `userId`    | `string` | The unique identifier of the user submitting the rating.                                                                                                                                |
| `articleId` | `string` | The unique identifier of the article being rated. |
| `rate`      | `number` | The rating value, typically within a defined range (e.g., 1 to 5).                                                                                                                                |
| `feedback`      | `string` | Optional feedback about the article.                                                                                                                               |


### Type Parameters 
1. For `getArticleRating`-  `<RatingData[], GetArticleRatingArg>`:
   - `RatingData[]` indicates that the query returns an array of rating objects.
   - `GetArticleRatingArg` defines the shape of the argument object expected by the query.

2. For `rateArticle`-  `<void, RateArticleArg>`:
    - `void` indicates that the mutation does not return a response body.
    - `RateArticleArg` defines the shape of the argument object expected by the mutation.

### Query Functions

1. `getArticleRating`
The `query` function constructs the request object, setting the URL to `/article-ratings` and including the necessary parameters:
   - `userId`: The unique identifier of the user.
   - `articleId`: The unique identifier of the article.

2. `rateArticle`
   The `query` function constructs the request object, setting the URL to `/article-ratings`, the HTTP method to POST, and including the `userId`, `articleId`, `rate`, and optional `feedback` in the request body.


### Exported Endpoints
- `useGetArticleRating`: A hook for initiating the `getArticleRating` query.
- `useRateArticle`: A hook for initiating the `rateArticle` mutation.
- 
## Usage Examples
### Example 1: Fetching Article Ratings
```typescript jsx
import { useGetArticleRating } from 'path/to/articleRatingApi';

const ArticleRatingComponent = ({ userId, articleId }) => {
    const { data: ratings, isLoading, error } = useGetArticleRating({ userId, articleId });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching ratings.</p>;

    return (
        <div>
            {ratings?.map(rating => (
                <div key={rating.id}>
                    <p>Rating: {rating.rate}</p>
                    <p>Feedback: {rating.feedback}</p>
                </div>
            ))}
        </div>
    );
};
```
### Example 2: Submitting an Article Rating
```typescript jsx
import { useGetArticleRating } from 'path/to/articleRatingApi';

const SubmitRatingComponent = ({ userId, articleId }) => {
   const [rateArticle] = useRateArticle();

   const handleSubmit = async () => {
      try {
         await rateArticle({
            userId,
            articleId,
            rate: 4,
            feedback: 'Great article!',
         });
         alert('Rating submitted successfully!');
      } catch (error) {
         alert('Error submitting rating.');
      }
   };

   return (
           <button onClick={handleSubmit}>
              Submit Rating
           </button>
   );
};
```


## Conclusion
The `articleRatingApi` provides a robust and efficient way to manage article ratings, enhancing user engagement and feedback collection. Utilizing Redux Toolkit Query ensures smooth state management and data fetching, making it easier to integrate article ratings into your application. 
The use of type parameters `<RatingData[], GetArticleRatingArg>` and `<void, RateArticleArg>` ensures type safety and clear expectations for the query and mutation's arguments and responses. 

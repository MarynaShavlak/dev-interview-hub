# `recommendationsApi`: API Documentation

## Overview

The `recommendationsApi` is a set of endpoints created using `rtkApi` for fetching article recommendations. 
This API enhances content discovery by providing users with tailored article suggestions based on specified criteria.

## Description
The `recommendationsApi` includes the `getArticleRecommendationsList` query, which retrieves a list of recommended articles. 
This endpoint leverages Redux Toolkit Query for efficient data fetching and state management.

### Import Details
- `rtkApi`: The base API service from **'@/shared/api/rtkApi'**.
- `Article`: The type definition for articles from **'@/entities/Article'**.
- `ArticleCategory`: The type definition for article categories from **'@/entities/Article'**.


###  Parameters
The query expects an object containing the following properties:

| Parameter  | Type                    | Description                                                                                                                       |
|------------|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `limit`   | `number`                | The maximum number of articles to fetch.                                                                                                                                  |
| `category` | `ArticleCategory` | The category of articles to fetch. |
| `exceptArticleId` | `string` | The ID of an article to exclude from the results. |



### Type Parameters `<Article[], ArticleRecommendationsParams>`:
The query is defined with two type parameters:
1. `Article[]` indicates that the query returns an array of articles.
2. Interface `ArticleRecommendationsParams ` defines the shape of the argument object that the query expects.

### Query Function
The `query` function constructs the request object, setting the URL to `/articles` and including the necessary parameters:
- `_limit`: The limit on the number of articles.
- `_expand`: Expands the user data associated with the articles.
- `id_ne`: Excludes the specified article ID.
- `category`: Filters articles by category, unless the category is ArticleCategory.ALL.

### Exported Query
`useArticleRecommendationsList` is exported from the module, allowing it to be used in other parts of the application to initiate the query.

## Usage Example
This example demonstrates how to use `useArticleRecommendationsList` to fetch recommended articles and display them in a React component.

```typescript jsx

import { memo } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    ArticleCategory,
    ArticleList,
    useArticleDetailsData,
} from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const article = useArticleDetailsData();
        const articleCategory = article?.category[0] || ArticleCategory.ALL;
        const {
            isLoading,
            data: articles,
            error,
        } = useArticleRecommendationsList({
            limit: 3,
            category: articleCategory,
            exceptArticleId: article?.id || '0',
        });

        if (isLoading || error || !articles) {
            return null;
        }
        return (
            <VStack gap="8" >
                <Text size="l" title="Рекомендуємо" />
                <ArticleList articles={articles} target="_blank" />
            </VStack>
            );
        },
    );
```

## Conclusion 
The `recommendationsApi` provides a robust and efficient way to fetch article recommendations, enhancing user engagement by offering relevant content. Utilizing Redux Toolkit Query ensures seamless state management and data fetching, making it easier to integrate article recommendations into your application. 
The use of type parameters ensures type safety and clear expectations for the query's arguments and response.

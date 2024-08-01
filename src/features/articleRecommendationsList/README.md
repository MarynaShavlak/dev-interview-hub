# ArticleRecommendationsList

## Overview
The **`ArticleRecommendationsList`** component fetches and displays a list of recommended articles based on the category of a given article. It enhances content discovery and user engagement by providing relevant article suggestions. The component adapts its display according to the app's design version, ensuring a consistent user experience.

## Type Definition 
```typescript
interface ArticleRecommendationsListProps {
    className?: string;
}
```

## Props
The **`ArticleRecommendationsList`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                          |
|------------|------------|----------------------|------------------------------------------------------|
| `className` | `string`   | Optional             | Custom class name for additional styling.           |


## Features
1. **Dynamic Recommendations**: Fetches a list of recommended articles based on the current article's category, excluding the current article itself.

2. **Design Adaptation**: Adjusts the rendered UI elements based on whether the redesigned interface (`isAppRedesigned` feature flag) is enabled.

## Usage Example
```typescript jsx
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';

const ArticlePage = () => (
    <div>
        {/* Other article details components */}
        <ArticleRecommendationsList className="recommendations-list" />
    </div>
);

export default ArticlePage;
```
## Conclusion
The **`ArticleRecommendationsList`** component is a vital tool for displaying relevant article recommendations, enhancing user engagement by offering additional content based on the current article's category. 
By supporting dynamic recommendations, design adaptation, and localization, it provides a versatile and user-friendly experience. 
The use of `memo` ensures optimal performance, making it an efficient choice for integrating article recommendations into your application.

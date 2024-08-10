# ArticleRecommendationsList Feature

## Overview
The **`ArticleRecommendationsList`** component fetches and displays a list of recommended articles based on the category of the current article. This component enhances content discovery and user engagement by providing relevant article suggestions. It dynamically adapts its display according to the app's design version, ensuring a consistent and tailored user experience.

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

3. **Lazy Loading**: The component is lazy-loaded to optimize performance. By loading the component only when needed, it reduces the initial load time of the application, improving the user experience.

4. **Skeleton Loading**: Implements a skeleton screen to enhance the user experience during loading states, providing visual feedback and maintaining the page's layout until the content is fully loaded.


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
The **`ArticleRecommendationsList`** omponent is a valuable feature for displaying relevant article recommendations, thereby enhancing user engagement by offering additional content based on the current article's category. By supporting dynamic recommendations, design adaptation, skeleton loading, and localization, it ensures a versatile and user-friendly experience. The use of `memo` optimizes performance, making it an efficient choice for integrating article recommendations into your application. This component not only improves content discoverability but also contributes to a smoother and more responsive user experience.

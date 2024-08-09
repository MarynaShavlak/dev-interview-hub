# ArticleDetails

## Overview
The **`ArticleDetails`** component is a dynamic interface for displaying article details, adapting to the application's design configuration. 
It leverages the `isAppRedesigned` feature flag to render either the `RedesignedArticleDetails` or the `DeprecatedArticleDetails`, ensuring the UI aligns with the current design standards. The component integrates `DynamicModuleLoader` to manage the `articleDetailsReducer`, optimizing state handling and modularity. By dynamically loading the reducer, it enhances performance and maintains efficient state management throughout the article's lifecycle.

## Type Definition
```typescript
interface ArticleDetailsProps {
    id?: string;
}
```
## Props
The **`ArticleDetails`** component accepts the following props:

| Prop | Type | Required / Optional | Description |
|------|------|----------------------|-------------|
| `id` | `string` | Optional | The unique identifier of the article to be fetched and displayed. |

## Features

1. **Feature Flag Adaptation**: Utilizes the `isAppRedesigned` feature flag to dynamically switch between `RedesignedArticleDetails` and `DeprecatedArticleDetails`. This ensures that the article details are presented in line with the current design system, providing a consistent user experience.

2. **Dynamic Reducer Management**: Incorporates `DynamicModuleLoader` to manage the `articleDetailsReducer`. This approach dynamically loads the reducer only when needed, which helps in optimizing application performance by reducing the initial bundle size and efficiently handling state.

3. **Initial Data Fetching**: Utilizes the `useInitialEffect` hook to dispatch `fetchArticleById` on component mount. This ensures that article data is fetched and available for rendering as soon as the component is initialized.

## Usage Example
```typescript jsx
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/ui/redesigned/Stack';
import {
    ArticleDetails,
    useArticleDetailsData,
    useArticleDetailsError,
} from '@/entities/Article';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleComments } from '@/widgets/ArticleComments';
import { ArticleRating } from '@/features/articleRating';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleDetailsPageHeader } from '../DeprecatedArticleDetailsPage/ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export const ArticleDetailsPageContainer = memo(() => {
    const { id } = useParams<{ id: string }>();
  
    return (
        <VStack gap="16" max>
            <Card max fullHeight border="round" padding="24">
                <ArticleDetails id={id} />
            </Card>
            
        </VStack>
    );
});
```

## Conclusion
The **`ArticleDetails`** component is pivotal in presenting detailed article information, adapting to design changes through feature flags, and efficiently managing state with dynamic reducers. By providing a seamless transition between redesigned and deprecated interfaces, it ensures that the user experience is consistent and aligned with current design standards. The component's dynamic data fetching and reducer management contribute to improved performance and a smooth user experience throughout the application's evolution.

# GridViewCardDeprecated

## Overview
The **`GridViewCardDeprecated`** component is used to render articles in a grid layout with deprecated styling and components. 
It is intended for applications that have not yet transitioned to newer UI components, ensuring that users still have access to article details through a consistent, albeit outdated, interface. 
This component will eventually be replaced by a redesigned version when the feature flag `isAppRedesigned` is active.

## Type Definition 
```typescript
export interface GridViewCardProps {
    className?: string;
    article: Article;
    target?: HTMLAttributeAnchorTarget;
}
```

## Props
The **`GridViewCardDeprecated`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `article` | `Article`   | Required             | The article object containing details such as title, image, and date.              |
| `target` | `HTMLAttributeAnchorTarget`   | Optional            | Specifies the target for the link (e.g., "_blank" to open in a new tab) |
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |


## Features
1. **Backward Compatibility**:  Provides a way to display articles using outdated UI components while maintaining consistent styling with the legacy design system.

2. **Interactive Hover State**: Utilizes the `useHover` hook to manage hover state, changing styles dynamically when the user hovers over the article item.

3. **Fallbacks and Loading States**: Includes a default image and a skeleton loader to handle cases where the article image is missing or still loading.

## Usage Example

```typescript jsx
import { GridViewCardDeprecated } from '@/entities/Article';
import { ArticleCategories } from '@/entities/Article';
import { Article } from '../../../../model/types/article';
import { ArticleCategory, ArticleSection } from '../../../../model/consts/articleConsts';
import { testArticleData } from './testing';


const App = () => (
    <GridViewCardDeprecated
        article={testArticleData}
        className="custom-item"
        target="_blank"
    />
);
```
## Conclusion
The **`GridViewCardDeprecated`** component is crucial for displaying articles in a grid layout using outdated styling. It provides an overview of each article with key details like image, title, creation date, categories, and view count, ensuring a consistent browsing experience. The component handles image fallbacks with a default image and skeleton loader, maintaining visual coherence even when data is missing or loading. It also features interactive hover effects to enhance user engagement. Overall, this component ensures users can access and interact with article content effectively while the application transitions to newer UI components.

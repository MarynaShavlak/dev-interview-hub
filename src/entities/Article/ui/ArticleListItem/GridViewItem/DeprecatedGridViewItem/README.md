# DeprecatedGridViewItem

## Overview
The **`DeprecatedGridViewItem`** component is used to render articles in a grid layout with deprecated styling and components. 
It is intended for applications that have not yet transitioned to newer UI components, ensuring that users still have access to article details through a consistent, albeit outdated, interface. 
This component will eventually be replaced by a redesigned version when the feature flag `isAppRedesigned` is active.

## Type Definition 
```typescript
export interface GridViewItemProps {
    className?: string;
    article: Article;
    target?: HTMLAttributeAnchorTarget;
}
```

## Props
The **`DeprecatedGridViewItem`** component accepts the following props:

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
import { DeprecatedGridViewItem } from '@/entities/Article';
import { ArticleCategories } from '@/entities/Article';
import { Article } from '../../../../model/types/article';
import { ArticleCategory, ArticleBlockType  } from '../../../../model/consts/articleConsts';

const sampleArticle: Article = {
    id: '1',
    user: {
        id: '123',
        username: 'Maryna Shavlak',
    },
    title: 'Test Article',
    subtitle: 'This is a test subtitle.',
    img: 'test-image-url',
    views: 100,
    createdAt: '2023-01-01T00:00:00.000Z',
    category: [ArticleCategory.IT, ArticleCategory.ECONOMICS],
    blocks: [
        {
            id: '2344',
            type: ArticleBlockType.TEXT,
            paragraphs: ['This is a text block.'],
        },
    ],
};

const App = () => (
    <DeprecatedGridViewItem
        article={sampleArticle}
        className="custom-item"
        target="_blank"
    />
);
```
## Conclusion
The **`DeprecatedGridViewItem`** component is crucial for displaying articles in a grid layout using outdated styling. It provides an overview of each article with key details like image, title, creation date, categories, and view count, ensuring a consistent browsing experience. The component handles image fallbacks with a default image and skeleton loader, maintaining visual coherence even when data is missing or loading. It also features interactive hover effects to enhance user engagement. Overall, this component ensures users can access and interact with article content effectively while the application transitions to newer UI components.

# GridViewCard

## Overview
The **`GridViewCard`** component dynamically switches between the `RedesignedGridViewCard` and `DeprecatedGridViewCard` components based on the `isAppRedesigned` feature flag. 
This approach ensures that users interact with either the modern or legacy grid view interface, depending on the current configuration of the application. By providing this flexibility, the component maintains a consistent user experience while transitioning between design systems.

## Type Definition 
```typescript
export interface GridViewCardProps {
    className?: string;
    article: Article;
    target?: HTMLAttributeAnchorTarget;
}
```

## Props
The **`GridViewCard`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `article` | `Article`   | Required             | The article object containing details such as title, image, and date.              |
| `target` | `HTMLAttributeAnchorTarget`   | Optional            | Specifies the target for the link (e.g., "_blank" to open in a new tab) |
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |


## Features
1. **Feature Flag Driven**: The component adapts between the redesigned and deprecated grid view interfaces based on the `isAppRedesigned` feature flag, providing a seamless transition between different design systems.
2. **Consistent Article Presentation**: IEnsures that article details are displayed consistently, whether using modern or legacy components, maintaining a uniform browsing experience.

## Usage Example
```typescript jsx
import { GridViewCard } from '@/entities/Article';
import { ArticleCategories } from '@/entities/Article';
import { Article } from '../../../../model/types/article';
import { ArticleCategory, ArticleSection  } from '../../../../model/consts/articleConsts';

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
            type: ArticleSection.TEXT,
            paragraphs: ['This is a text block.'],
        },
    ],
};

const App = () => (
    <GridViewCard
        article={sampleArticle}
        className="custom-item"
        target="_blank"
    />
);
```
## Conclusion
The **`GridViewCard`** component is crucial for rendering articles in a grid layout, offering a flexible and adaptive interface that caters to both legacy and modern design systems. 
By leveraging the `isAppRedesigned` feature flag, the component seamlessly transitions between the `RedesignedGridViewCard` and `DeprecatedGridViewCard` components, ensuring users receive a consistent and visually appealing experience irrespective of the application's design state. 
The component effectively presents article details such as title, image, creation date, and user avatar, maintaining a high level of detail and engagement. 
This adaptability not only enhances user experience but also supports the application's evolution, allowing for smooth upgrades and interface changes without disrupting the user interface. 
The `GridViewCard` component thus plays a pivotal role in ensuring that articles are displayed effectively and interactively, supporting both current and future design paradigms.

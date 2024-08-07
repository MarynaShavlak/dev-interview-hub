# RedesignedGridViewItem

## Overview
The **`RedesignedGridViewItem`** component is designed to display articles in a grid layout with an updated and modern interface
It is utilized when the feature flag `isAppRedesigned` is set to true, showcasing a refreshed visual style and improved user experience. The component renders article details such as the title, image, creation date, and user avatar, ensuring a consistent and engaging layout across the application.

## Type Definition 
```typescript
export interface GridViewItemProps {
    className?: string;
    article: Article;
    target?: HTMLAttributeAnchorTarget;
}
```

## Props
The **`RedesignedGridViewItem`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `article` | `Article`   | Required             | The article object containing details such as title, image, and date.              |
| `target` | `HTMLAttributeAnchorTarget`   | Optional            | Specifies the target for the link (e.g., "_blank" to open in a new tab) |
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |


## Features
1. **Modern UI**:  Leverages updated UI components to provide a contemporary and visually appealing layout for articles.

2. **Fallbacks and Loading States**: Includes a default image and a skeleton loader to handle cases where the article image is missing or still loading.

## Usage Example
```typescript jsx
import { RedesignedGridViewItem } from '@/entities/Article';
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
    <RedesignedGridViewItem
        article={sampleArticle}
        className="custom-item"
        target="_blank"
    />
);
```
## Conclusion
The **`RedesignedGridViewItem`** component is essential for displaying articles in a grid layout with modern styling. It offers a comprehensive view of each article, highlighting key details such as the image, title, creation date, and user avatar. This component ensures a visually appealing and engaging browsing experience by utilizing updated UI elements and flexible layouts. It also includes fallbacks for images and a skeleton loader to handle scenarios where the article image is missing or still loading. By incorporating dynamic styling and modern design principles, the `RedesignedGridViewItem` component provides a seamless and interactive user experience, aligning with contemporary UI standards and enhancing content presentation.

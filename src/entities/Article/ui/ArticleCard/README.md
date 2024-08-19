# ArticleCard

## Overview
The **`ArticleCard`** component dynamically switches between the `ListViewItem` and `GridViewItem` components based on the specified `view` prop. 
This approach ensures that articles are displayed in either a list or grid layout, providing flexibility in presentation and allowing users to interact with the content in their preferred format. By accommodating different view types, the component maintains a consistent user experience across various sections of the application.

## Type Definition 
```typescript
export interface ArticleCardProps {
    className?: string;
    view: ArticleView;
    article: Article;
    target?: HTMLAttributeAnchorTarget;
}
```

## Props
The **`ArticleCard`** component accepts the following props:

| Prop        | Type       | Required / Optional | Description                                                               |
|-------------|------------|----------------------|---------------------------------------------------------------------------|
| `article`   | `Article`   | Required             | The article object containing details such as title, image, and date.              |
| `view`      | `ArticleView`   | Required             | Specifies the layout view for the article (list or grid). |
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |
| `target`    | `HTMLAttributeAnchorTarget`   | Optional            | Specifies the target for the link (e.g., "_blank" to open in a new tab) |


## Features
1. **Dynamic View Switching**: The component adapts between list and grid views based on the `view` prop, allowing for flexible article presentation.
2. **Consistent Article Presentation**: Ensures that article details are displayed consistently across both list and grid layouts, maintaining a uniform browsing experience.

## Usage Example
```typescript jsx
import { ArticleCard } from '@/entities/Article';
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
    <>
        <ArticleCard
            article={sampleArticle}
            className="custom-article-list-item"
            view={ArticleView.LIST}
        />
        <ArticleCard
            article={sampleArticle}
            className="custom-article-grid-item"
            view={ArticleView.GRID}
            target="_blank"
        />
    </>
);
```
## Conclusion
The **`ArticleCard`** component is essential for rendering articles in both list and grid layouts, offering a flexible and adaptive interface that caters to various presentation needs. 
By leveraging the view prop, the component seamlessly transitions between the `ListViewItem` and `GridViewItem` components, ensuring users receive a consistent and visually appealing experience irrespective of the chosen layout. 
The component effectively presents article details such as title, image, creation date, and user avatar, maintaining a high level of detail and engagement. 
This adaptability enhances user experience and supports the application's evolution, allowing for smooth transitions between different view types without disrupting the user interface. 
The `ArticleCard` component thus plays a pivotal role in ensuring that articles are displayed effectively and interactively, supporting both current and future design paradigms.

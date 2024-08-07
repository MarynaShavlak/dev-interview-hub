# ListViewItem

## Overview
The **`ListViewItem`** component dynamically switches between the `RedesignedListViewItem` and `DeprecatedListViewItem` components based on the `isAppRedesigned` feature flag. 
This approach ensures that users interact with either the modern or legacy list view interface, depending on the current configuration of the application. By providing this flexibility, the component maintains a consistent user experience while transitioning between design systems.

## Type Definition 
```typescript
export interface ListViewItemProps {
    className?: string;
    article: Article;
}
```

## Props
The **`ListViewItem`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `article` | `Article`   | Required             | The article object containing details such as title, image, and date.              |
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |


## Features
1. **Feature Flag Driven**: The component adapts between the redesigned and deprecated grid view interfaces based on the `isAppRedesigned` feature flag, providing a seamless transition between different design systems.
2. **Consistent Article Presentation**: IEnsures that article details are displayed consistently, whether using modern or legacy components, maintaining a uniform browsing experience.

## Usage Example
```typescript jsx
import { ListViewItem } from '@/entities/Article';
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
    <ListViewItem
        article={sampleArticle}
        className="custom-grid-item"
        target="_blank"
    />
);
```
## Conclusion
The **`ListViewItem`** component is crucial for rendering articles in a list layout, offering a flexible and adaptive interface that caters to both legacy and modern design systems. 
By leveraging the `isAppRedesigned` feature flag, the component seamlessly transitions between the `RedesignedListViewItem` and `DeprecatedListViewItem` components, ensuring users receive a consistent and visually appealing experience irrespective of the application's design state. 
The component effectively presents article details such as title, image, creation date, and user avatar, maintaining a high level of detail and engagement. 
This adaptability not only enhances user experience but also supports the application's evolution, allowing for smooth upgrades and interface changes without disrupting the user interface. 
The `ListViewItem` component thus plays a pivotal role in ensuring that articles are displayed effectively and interactively, supporting both current and future design paradigms.

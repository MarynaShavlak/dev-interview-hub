# RedesignedListViewItem

## Overview
The **`RedesignedListViewItem`** component is designed to display articles in a list layout with an updated and modern interface. It is utilized when the feature flag  `isAppRedesigned` is set to true, showcasing a refreshed visual style and improved user experience. The component renders article details such as the title, image, creation date, and user avatar, ensuring a consistent and engaging layout across the application.

## Type Definition
```typescript
export interface ListViewItemProps{
    className?: string;
    article: Article;
}
```

## Props
The **`RedesignedListViewItem`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `article` | `Article`   | Required             | The article object containing details such as title, image, and date.              |
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |


## Features
1. **Modern UI**:  Leverages updated UI components to provide a contemporary and visually appealing layout for articles.

2. . **User Information Display**: Displays the article author's avatar and username, ensuring that user information is prominently shown.

3. **Article Details**: Presents the article's title, creation date, categories, and a brief text block, giving users a comprehensive overview of the article content.

4. **Image Handling**: Includes fallbacks and a skeleton loader for the article image, ensuring a smooth user experience even when the image is missing or still loading.

5. **Read More Link**: Provides a link to the full article, encouraging user engagement with the content.

6. **View Count**: Displays the number of views the article has received, adding a layer of social proof.


## Usage Example
```typescript jsx
import { RedesignedListViewItem} from '@/entities/Article';
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
    <RedesignedListViewItem
        article={sampleArticle}
        className="custom-grid-item"
        target="_blank"
    />
);
```
## Conclusion
The **`RedesignedListViewItem`**  component is essential for displaying articles in a list layout with modern styling. It offers a comprehensive view of each article, highlighting key details such as the image, title, creation date, and user avatar. This component ensures a visually appealing and engaging browsing experience by utilizing updated UI elements and flexible layouts. It also includes fallbacks for images and a skeleton loader to handle scenarios where the article image is missing or still loading. By incorporating dynamic styling and modern design principles, the `RedesignedListViewItem` component provides a seamless and interactive user experience, aligning with contemporary UI standards and enhancing content presentation.

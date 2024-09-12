# DeprecatedListViewCard

## Overview
The **`DeprecatedListViewCard`** component is designed to render articles in a list layout using deprecated styling and components. This component is essential for applications that have not yet transitioned to newer UI components, ensuring users can still access article details through a consistent, although outdated, interface. This component is scheduled for replacement by a redesigned version when the feature flag `isAppRedesigned` is active.

## Type Definition 
```typescript
interface ListViewCardProps {
    className?: string;
    article: Article;
}
```

## Props
The **`DeprecatedListViewCard`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `article` | `Article`   | Required             | The article object containing details such as title, image, and date.              |
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |


## Features
1. **Backward Compatibility**:  Provides a way to display articles using outdated UI components while maintaining consistent styling with the legacy design system.

2. **User Information Display**: Displays the article author's avatar and username, ensuring that user information is prominently shown.

3. **Article Details**: Presents the article's title, creation date, categories, and a brief text block, giving users a comprehensive overview of the article content.

4. **Image Handling**: Includes fallbacks and a skeleton loader for the article image, ensuring a smooth user experience even when the image is missing or still loading.

5. **Read More Link**: Provides a link to the full article, encouraging user engagement with the content.

6. **View Count**: Displays the number of views the article has received, adding a layer of social proof.

## Usage Example

```typescript jsx
import { DeprecatedListViewCard } from '@/entities/Article';
import { ArticleCategories } from '@/entities/Article';
import { Article } from '../../../../model/types/article';
import { ArticleCategory, ArticleSection } from '../../../../model/consts/articleConsts';
import { testArticleData } from './testing';


const App = () => (
    <DeprecatedListViewCard
        article={testArticleData}
        className="custom-item"
        target="_blank"
    />
);
```
## Conclusion
The **`DeprecatedListViewCard`** component is crucial for displaying articles in a list layout using outdated styling. It offers a comprehensive view of each article, including the author's information, title, creation date, categories, a brief text snippet, and view count. The component ensures a consistent and engaging browsing experience by handling image fallbacks with a default image and skeleton loader. Overall, this component is vital for maintaining access to article content during the transition to newer UI components.

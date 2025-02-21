# GridViewCardRedesigned

## Overview
The **`GridViewCardRedesigned`** component is designed to display articles in a grid layout with an updated and modern interface
It is utilized when the feature flag `isAppRedesigned` is set to true, showcasing a refreshed visual style and improved user experience. The component renders article details such as the title, image, creation date, and user avatar, ensuring a consistent and engaging layout across the application.

## Type Definition 
```typescript
export interface BaseCardProps {
    className?: string;
    article: Article;
    index: number;
    target?: HTMLAttributeAnchorTarget;
}
```

## Props
The **`GridViewCardRedesigned`** component accepts the following props:

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
import { GridViewCardRedesigned } from '@/entities/Article';
import { ArticleCategories } from '@/entities/Article';
import { Article } from '../../../../model/types/article';
import { ArticleCategory, ArticleSection } from '../../../../model/consts/articleConsts';
import { testArticleData } from './testing';


const App = () => (
    <GridViewCardRedesigned
        article={testArticleData}
        className="custom-item"
        target="_blank"
    />
);
```
## Conclusion
The **`GridViewCardRedesigned`** component is essential for displaying articles in a grid layout with modern styling. It offers a comprehensive view of each article, highlighting key details such as the image, title, creation date, and user avatar. This component ensures a visually appealing and engaging browsing experience by utilizing updated UI elements and flexible layouts. It also includes fallbacks for images and a skeleton loader to handle scenarios where the article image is missing or still loading. By incorporating dynamic styling and modern design principles, the `GridViewCardRedesigned` component provides a seamless and interactive user experience, aligning with contemporary UI standards and enhancing content presentation.

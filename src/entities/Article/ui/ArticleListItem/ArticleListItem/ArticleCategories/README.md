# ArticleCategories

## Overview
The **`ArticleCategories`** component is designed to display the categories of an article. It utilizes feature toggling to support both modern and deprecated UI designs, ensuring that the categories are rendered appropriately based on the current application design. By using `ToggleFeaturesComponent`,  it switches between the redesigned `Text` component and the deprecated `TextDeprecated` `component based on the `isAppRedesigned` feature flag.

## Type Definition 
```typescript
interface CategoriesProps {
   article: Article;
}
```

## Props
The **`ArticleCategories`** component accepts the following props:

| Prop       | Type      | Required / Optional | Description                                                                   |
|------------|-----------|----------------------|-------------------------------------------------------------------------------|
| `article` | `Article` | Required            | The article object containing the categories to be displayed.|


## Features
1. **Conditional Rendering**:
   - **Feature Toggling**: Utilizes `ToggleFeaturesComponent` to conditionally render either the `Text` component or the `TextDeprecated` component based on the `isAppRedesigned` feature flag.  This allows the component to adapt to different UI designs seamlessly.

2. **Category Display**:
   - **Categories**: Renders the categories of the article as a comma-separated list. The text component used for rendering adapts to the feature flag, ensuring the appropriate styling and behavior.

## Usage Example
```typescript jsx
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

const ExampleComponent = () => {
   return (
           <div>
              <ArticleCategories article={sampleArticle} />
              {/* The ArticleCategories component displays the categories of the article with adaptive UI rendering */}
           </div>
   );
};
```

## Conclusion
The **`ArticleCategories`** component effectively displays the categories associated with an article, leveraging feature toggling to ensure compatibility with both modern and legacy UI designs. This component ensures that category information is presented consistently across different versions of the application, providing a seamless user experience while adapting to various design systems.

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
import { Article } from './article';
import { ArticleCategory, SectionType } from './articleConsts';
import { testArticleData } from './testing';


const ExampleComponent = () => {
   return (
           <div>
              <ArticleCategories article={testArticleData}/>
              {/* The ArticleCategories component displays the categories of the article with adaptive UI rendering */}
           </div>
   );
};
```

## Conclusion
The **`ArticleCategories`** component effectively displays the categories associated with an article, leveraging feature toggling to ensure compatibility with both modern and legacy UI designs. This component ensures that category information is presented consistently across different versions of the application, providing a seamless user experience while adapting to various design systems.

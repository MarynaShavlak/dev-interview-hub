# ArticleViews

## Overview
The **`ArticleViews`** component is designed to display the number of views for an article. It supports conditional rendering based on feature flags to adapt to both modern and deprecated UI designs.
By using `ToggleFeaturesComponent`,  it switches between the redesigned `Text` and  `Icon` components, and their deprecated counterparts, ensuring the component maintains compatibility with various design systems.

## Type Definition 
```typescript
interface ViewsProps {
   article: Article;
}
```

## Props
The **`ArticleViews`** component accepts the following props:

| Prop       | Type      | Required / Optional | Description                                                                  |
|------------|-----------|----------------------|------------------------------------------------------------------------------|
| `article` | `Article` | Required            | The article object containing the number of views to be displayed.|


## Features
1. **Conditional Rendering**:
   - **Feature Toggling**: Utilizes `ToggleFeaturesComponent` to conditionally render either the `Text` and  `Icon`  components or the `TextDeprecated` and  `IconDeprecated`  components  based on the `isAppRedesigned` feature flag.  This allows the component to adapt to different UI designs seamlessly.

2. **Views Display**:
   - **Icon and Text**: Displays the number of views alongside an icon. The icon and text components used for rendering adapt based on the feature flag, ensuring the appropriate styling and behavior.
   - 
## Usage Example

```typescript jsx
import { ArticleViews } from '@/entities/Article';
import { Article } from './article';
import { ArticleCategory, SectionType } from './articleConsts';
import { testArticleData } from './testing';

const ExampleComponent = () => {
   return (
           <div>
              <ArticleViews article={testArticleData}/>
              {/* The ArticleViews component displays the number of views with adaptive UI rendering */}
           </div>
   );
};
```

## Conclusion
The **`ArticleViews`** component provides a consistent way to display the number of views for an article, adapting to both modern and legacy UI designs through feature toggling. By incorporating conditional rendering for icons and text components, it ensures compatibility with various design systems and maintains a seamless user experience across different application versions.

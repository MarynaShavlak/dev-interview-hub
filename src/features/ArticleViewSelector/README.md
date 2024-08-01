# ArticleViewSelector Feature

## Overview
The **`ArticleViewSelector`** component dynamically renders either the `RedesignedArticleViewSelector` or the `DeprecatedArticleViewSelector` based on the `isAppRedesigned` feature flag. 
This ensures that users experience either the new and improved interface or the legacy version, depending on the application's configuration. It includes buttons that allow users to choose between viewing articles as a grid of elements or as a list, enhancing the user's control over content presentation.

## Type Definition 
```typescript
interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}
```

## Props
The **`ArticleViewSelector`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                          |
|------------|------------|----------------------|------------------------------------------------------|
| `view` | `ArticleView`   | Required             | The current view of the article to be displayed.          |
| `onViewClick` | `(view: ArticleView) => void`   | Optional             | Callback function to handle view changes.           |
| `className` | `string`   | Optional             | Custom class name for additional styling.           |


## Features
1. **Design Adaptation**: Renders different UI elements based on whether the redesigned interface is enabled or not. This ensures consistency with the application's design system.
2. **User-Driven View Switching**: Allows seamless switching between grid and list views for improved user experience.


## Usage Example
```typescript jsx
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ArticleView } from '@/entities/Article';

const App = () => {
    const handleViewClick = (view: ArticleView) => {
        console.log('View changed to:', view);
    };

    return (
        <div>
            <ArticleViewSelector
                className="my-custom-class"
                view={ArticleView.GRID}
                onViewClick={handleViewClick}
            />
            {/* The ArticleViewSelector component adapts to the application's feature flag settings */}
        </div>
    );
};
```
## Conclusion
The **`ArticleViewSelector`** component plays a crucial role in bridging the gap between legacy and modern interfaces. By leveraging feature flags, it ensures that users experience the most appropriate version of the article view selector, facilitating a smooth transition to newer UI paradigms without sacrificing compatibility. Additionally, it provides essential buttons that allow users to choose their preferred view for the articles list, whether as a grid of elements or as a list, thereby enhancing the overall user experience.

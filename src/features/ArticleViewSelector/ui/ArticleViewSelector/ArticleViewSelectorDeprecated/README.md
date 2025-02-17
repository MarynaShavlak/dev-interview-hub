# DeprecatedArticleViewSelector

## Overview
The **`DeprecatedArticleViewSelector`** component is rendered when the feature flag `isAppRedesigned` is `false`, providing users with deprecated interface for selecting article view modes. When this flag is active feature flag, the `RedesignedArticleViewSelector` is rendered instead.
This component utilizes the deprecated UI elements to ensure a seamless and intuitive user experience.

## Type Definition 
```typescript
interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}
```

## Props
The **`DeprecatedArticleViewSelector`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                          |
|------------|------------|----------------------|------------------------------------------------------|
| `view` | `ArticleView`   | Required             | The current view of the article to be displayed.          |
| `onViewClick` | `(view: ArticleView) => void`   | Optional             | Callback function to handle view changes.           |
| `className` | `string`   | Optional             | Custom class name for additional styling.           |


## Features
1.**Backward Compatibility**: Leverages deprecated UI components to ensure compatibility with older versions of the application, facilitating gradual UI updates.

2.**User-Driven View Switching**: Allows seamless switching between grid and list views for improved user experience.

## Usage Example
```typescript jsx
import { DeprecatedArticleViewSelector } from '@/features/ArticleViewSelector/DeprecatedArticleViewSelector';
import { ArticleView } from '@/entities/Article';

const App = () => {
    const handleViewClick = (view: ArticleView) => {
        console.log('View changed to:', view);
    };

    return (
        <div>
            <DeprecatedArticleViewSelector
                className="my-custom-class"
                view={ArticleView.LIST}
                onViewClick={handleViewClick}
            />
            {/* The DeprecatedArticleViewSelector component allows users to switch between different article views */}
        </div>
    );
};
```
## Conclusion
The **`DeprecatedArticleViewSelector`** component is essential for applications needing backward compatibility with deprecated design system. By offering a simple yet effective way for users to toggle between grid and list views, it enhances usability while facilitating smooth transition in deprecated design system.

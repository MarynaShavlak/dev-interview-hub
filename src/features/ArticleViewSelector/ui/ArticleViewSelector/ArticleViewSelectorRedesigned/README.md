# ArticleViewSelectorRedesigned

## Overview
The **`ArticleViewSelectorRedesigned`** component is rendered when the feature flag `isAppRedesigned` is `true`, providing users with an enhanced and modern interface for selecting article view modes.
If this feature flag is not active, the `ArticleViewSelectorDeprecated` is rendered instead. 
This component utilizes the latest UI elements to ensure a seamless and intuitive user experience.

## Type Definition 
```typescript
interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}
```

## Props
The **`ArticleViewSelectorRedesigned`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                          |
|------------|------------|----------------------|------------------------------------------------------|
| `view` | `ArticleView`   | Required             | The current view of the article to be displayed.          |
| `onViewClick` | `(view: ArticleView) => void`   | Optional             | Callback function to handle view changes.           |
| `className` | `string`   | Optional             | Custom class name for additional styling.           |


## Features
1. **Backward Compatibility**: Utilizes the latest UI components, providing a refreshed and contemporary look and feel.

2. **User-Driven View Switching**: Allows seamless switching between grid and list views for improved user experience.

3. **Customizability** : Supports additional styling through the `className` prop, enabling easy integration with existing designs.

## Usage Example
```typescript jsx
import { ArticleViewSelectorRedesigned } from '@/features/ArticleViewSelector/ArticleViewSelectorRedesigned';
import { ArticleView } from '@/entities/Article';

const App = () => {
    const handleViewClick = (view: ArticleView) => {
        console.log('View changed to:', view);
    };

    return (
        <div>
            <ArticleViewSelectorRedesigned
                className="my-custom-class"
                view={ArticleView.GRID}
                onViewClick={handleViewClick}
            />
            {/* The ArticleViewSelectorRedesigned component allows users to switch between different article views */}
        </div>
    );
};
```
## Conclusion
The **`ArticleViewSelectorRedesigned`** component is a crucial element for applications utilizing the latest design system. By offering an intuitive and modern interface for toggling between grid and list views, it significantly enhances the user experience while aligning with contemporary design standards.

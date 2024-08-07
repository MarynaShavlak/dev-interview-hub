# NoArticlesFound

## Overview
The **`NoArticlesFound`** component displays a message indicating that no articles were found, dynamically switching between redesigned and deprecated text styles based on the `isAppRedesigned` feature flag. This component ensures that users receive a consistent and visually appropriate notification when there are no articles to display, enhancing user experience by providing clear feedback in both modern and legacy design systems.

## Type Definition
```typescript
export interface NoArticlesFoundProps {
    className?: string;
    view: ArticleView;
}
```

## Props
The **`NoArticlesFound`** component accepts the following props:

| Prop        | Type       | Required / Optional | Description                                                               |
|-------------|------------|----------------------|---------------------------------------------------------------------------|
| `view`      | `ArticleView`   | Required             | Specifies the layout view for the article (list or grid). |
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |

## Features
1. **Feature Flag Driven**: The component adapts between redesigned and deprecated text styles based on the `isAppRedesigned` feature flag, ensuring visual consistency with the current design standards of the application.
2. **Dynamic Text Styles**: Utilizes the `toggleFeatures` to conditionally render either the redesigned or deprecated text styles, providing appropriate feedback in both modern and legacy design systems.
3. **Consistent Layout**: Maintains a consistent layout for the no-articles message across different view types (list or grid), ensuring a uniform user experience.

## Usage Example
```typescript jsx
import { NoArticlesFound } from '@/entities/Article';
import { ArticleView } from '@/model/consts/articleConsts';

const App = () => (
    <div className="article-list">
        <NoArticlesFound view={ArticleView.LIST} />
        <NoArticlesFound view={ArticleView.GRID} className="custom-no-articles" />
    </div>
);
```
## Conclusion
The `NoArticlesFound` component is crucial for providing a clear and visually appropriate message when no articles are available, adapting seamlessly to both modern and legacy design systems. 
By leveraging the `isAppRedesigned` feature flag, the component ensures that users receive consistent feedback regardless of the design state of the application. 
This flexibility enhances user experience and supports the application's evolution, allowing for smooth transitions between different design paradigms without disrupting the user interface. 
The `NoArticlesFound` component thus plays a vital role in maintaining user engagement and delivering clear notifications during content browsing.

# ArticleEditNavigationButton

## Overview
The **`ArticleEditNavigationButton`** component provides a button for navigating to the edit page of a specific article within the application. It adapts its appearance and functionality based on the application's design system and feature flags, ensuring a consistent user experience across different contexts. This component is deeply integrated with the application's routing and localization systems, facilitating easy navigation to the article edit page.

## Props
The **`ArticleEditNavigationButton`** component does not accept any props.

## Features
1.**Navigation to Article Edit Page**: Directly navigates users to the edit page of the current article using the `getRouteArticleEdit(article.id)` function, allowing for seamless editing of article content.

2.**Conditional Rendering**: Renders UI elements based on whether the redesigned interface (`isAppRedesigned` feature flag) is enabled.


## Usage Example
```typescript jsx
import { ArticleEditNavigationButton } from '@/features/ArticleEditNavigationButton';

const App = () => (
    <div>
        <ArticleEditNavigationButton />
        {/* The ArticleEditNavigationButton component allows users to navigate to the edit page of the current article */}
    </div>
);
```
## Conclusion
The **`ArticleEditNavigationButton`** component serves as an essential navigational element for applications that feature articles. 
It allows users to easily access the edit page of the current article, integrating seamlessly with the application's design and functionality. 
By adapting to the current design system and leveraging feature flags, it ensures a user-friendly interface that enhances overall usability and navigation efficiency.

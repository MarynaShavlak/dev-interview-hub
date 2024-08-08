# ArticleDetailsPageHeader

## Overview
The **`ArticleDetailsPageHeader`** component is designed to render the header section of the article details page. It provides navigation buttons to facilitate user interactions with the article. The component utilizes the `useSelector` hook to determine if the user has permission to edit the article, and conditionally displays the `ArticleEditNavigationButton` based on this permission. This setup ensures a streamlined and context-aware header for managing and navigating articles.

## Type Definition
```typescript
interface ArticleDetailsPageHeaderProps {
    className?: string;
}
```

## Props
The **`ArticleDetailsPageHeader`** component accepts the following props:

| Prop          | Type                    | Required / Optional | Description                                                                |
|---------------|-------------------------|----------------------|----------------------------------------------------------------------------|
| `className`    | `string`                | Optional             | Custom class name for additional styling.                                  |


## Features
1. **Conditional Edit Button**: Checks user permissions using the `useSelector` hook and conditionally displays the `ArticleEditNavigationButton` if the user has the rights to edit the article.
2. **Navigation Buttons**: Includes the `ArticleListNavigationButton` to facilitate navigation back to the article list, enhancing user navigation experience.
3. **Responsive Layout**: Utilizes the `HStack` component to align navigation buttons horizontally, ensuring a clean and adaptive layout.

## Usage Example
```typescript jsx
import { ArticleDetailsPageHeader } from '@/pages/ArticleDetailsPage';

const ArticleDetailsPage = () => {
    return (
        <div className="article-details-page">
            <ArticleDetailsPageHeader className="header" />
            {/* Other components and content */}
        </div>
    );
};
```
## Conclusion
The `ArticleDetailsPageHeader` component is essential for managing navigation and editing functionalities on the article details page. By conditionally rendering the edit button based on user permissions and providing straightforward navigation options, it enhances user experience and maintains a consistent interface.

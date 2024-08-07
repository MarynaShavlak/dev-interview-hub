# ArticleAdditionalInfo Widget

## Overview
The `ArticleAdditionalInfo` widget provides additional information about an article, including the author's details, creation date, and view count. It incorporates internationalization for displaying view counts in both singular and plural forms, adapting to different languages such as Ukrainian and English. 
This component also includes an `ArticleEditNavigationButton`, allowing users to navigate to article editing functionalities.

##  Type Definition
```typescript
interface ArticleAdditionalInfoProps {
    className?: string;
    author: User;
    createdAt: string;
    views: number;
}
```

## Props
The `ArticleAdditionalInfo` component accepts the following props:

| Prop         | Type     |          Required / Optional          | Description                                                                 |
|--------------|----------|:-------------------------------------:|-----------------------------------------------------------------------------|
| `author`  | `User`   |               Required                | The author of the article, containing user details such as avatar and username.                          |
| `createdAt`  | `string` |               Required                | The publication date of the article.                          |
| `views`  | `number` |               Required                | The number of views the article has received.                        |
| `className`  | `string` |               Optional                | Additional CSS class names to apply to the main container.                       |


## Features
1. **Author Information Display**: Shows the author's avatar and username, providing a visual and textual representation of the author.
2. **Publication Date Display**: Displays the date the article was published, ensuring users can see how recent the content is.
3. **View Count Display**: Shows the number of views the article has received, providing an indicator of its popularity.
4. **Edit Navigation Button**: Integrates an edit navigation button for quick access to article editing functionality.
5. **Internationalization and Pluralization**:
   - Utilizes `i18next` for translation and pluralization.
   - For English: Displays view counts in singular and plural forms as `"{{count}} view"` and `"{{count}} views"`.
   - For Ukrainian: Handles pluralization with forms such as `"{{count}} перегляд"`, `"{{count}} перегляди"`, and `"{{count}} переглядів"` based on the count.

## Usage Example
```typescript jsx
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { User } from '@/entities/User';

const author: User = {
    id: '1',
    username: 'Maryna Shavlak',
    avatar: 'path/to/avatar.jpg',
};

const App = () => {
    return (
        <div>
            <ArticleAdditionalInfo
                className="custom-article-additional-info"
                author={author}
                createdAt="2024-08-07"
                views={123}
            />
            {/* The ArticleAdditionalInfo component displays supplementary information about the article */}
        </div>
    );
};
```

## Conclusion
The `ArticleAdditionalInfo` component plays a crucial role in displaying key information about an article. It ensures that the article details are presented clearly and in a localized manner, adapting to different languages and pluralization rules. The inclusion of the article edit navigation button further enhances the component's functionality, making it an essential part of the article details interface.

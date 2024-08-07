# ArticleAdditionalInfo Widget

## Overview 
The `ArticleAdditionalInfo` widget provides detailed metadata about an article, including information about the author, the publication date, and the number of views. Additionally, it includes a navigation button for editing the article, facilitating quick access to article editing functionality. This component is essential for displaying supplementary article information in a user-friendly and structured manner. It utilizes redesigned UI elements to ensure a modern and consistent interface.

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


## Functionality
1. **Author Information Display**: Shows the author's avatar and username, providing a visual and textual representation of the author.
2. **Publication Date Display**: Displays the date the article was published, ensuring users can see how recent the content is.
3. **View Count Display**: Shows the number of views the article has received, providing an indicator of its popularity.
4. **Edit Navigation Button**: Integrates an edit navigation button for quick access to article editing functionality.

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
The `ArticleAdditionalInfo` component is a vital element for enriching article pages with supplementary details. By presenting author information, publication dates, view counts, and providing an edit navigation button, it enhances the overall user experience and provides valuable context to readers. This component ensures that users have easy access to all relevant article metadata and editing capabilities.

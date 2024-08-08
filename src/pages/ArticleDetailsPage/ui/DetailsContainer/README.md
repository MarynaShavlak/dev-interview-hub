# DetailsContainer

## Overview
The **`DetailsContainer`** component is responsible for rendering the `ArticleDetails` component within a styled `Card` layout. It utilizes the `useParams` hook from `react-router-dom` to retrieve the article ID from the URL, which is then passed to the `ArticleDetails` component to display specific details about the article. This setup allows for a dynamic and detailed view of articles based on their unique IDs.

## Props
The **`DetailsContainer`** component accepts the following props:

| Prop        | Type       | Required / Optional | Description                           |
|-------------|------------|----------------------|---------------------------------------|
| `className`  | `string`   | Optional             | Additional CSS class names to apply to the main container. |

## Features
1. **Dynamic Article Loading**: Utilizes the `useParams` hook to dynamically extract the article ID from the URL, ensuring the correct article details are loaded and displayed.
2. **Styled Layout**: Uses the `Card` component to present the `ArticleDetails` with padding and a rounded border, providing a visually appealing and consistent layout.
3. **Responsive Design**: The `Card` component is set to `fullHeight` and has `max` width, ensuring that it adapts to various screen sizes.

## Usage Example
```typescript jsx
import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo(({ className }: ArticlePageProps) => {
    return (
        <Page
            className={className}
            data-testid="ArticlePage"
        >
            <DetailsContainer />
        </Page>
    );
});

export default ArticleDetailsPage;

```

## Conclusion
The **`DetailsContainer`**  component is a key part of the article viewing interface, dynamically rendering article details based on the ID extracted from the URL. By encapsulating the logic to fetch and display article-specific information within a styled `Card`, it enhances the user experience with a clear and consistent layout. This approach ensures that the article details are presented effectively while maintaining a responsive and visually appealing design.

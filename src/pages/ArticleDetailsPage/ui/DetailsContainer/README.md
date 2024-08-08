# DetailsContainer

## Overview
The **`DetailsContainer`** component is responsible for rendering the `ArticleDetails` component within a styled `Card` layout.
It utilizes the `useParams` hook from `react-router-dom` to retrieve the article ID from the URL, which is then passed to the `ArticleDetails` component to display specific details about the article.
The component dynamically switches between a redesigned layout using a `Card` component or a traditional layout with a header, depending on the `isAppRedesigned` feature flag.


## Props
The **`DetailsContainer`** component accepts the following props:

| Prop        | Type       | Required / Optional | Description                           |
|-------------|------------|----------------------|---------------------------------------|
| `className`  | `string`   | Optional             | Additional CSS class names to apply to the main container. |

## Features
1. **Dynamic Article Loading**: Utilizes the `useParams` hook to dynamically extract the article ID from the URL, ensuring the correct article details are loaded and displayed.
2. **Styled Layout**: Uses the `Card` component to present the `ArticleDetails` with padding and a rounded border, providing a visually appealing and consistent layout.
3. **Responsive Design**: The `Card` component is set to `fullHeight` and has `max` width, ensuring that it adapts to various screen sizes.
4. **Dynamic Layout**: The component uses the `ToggleFeaturesComponent` to switch between redesigned and traditional layouts based on the `isAppRedesigned` feature flag.

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
The **`DetailsContainer`**  component is integral to the article viewing interface, providing a dynamic and styled presentation of article details based on the URL. By leveraging feature flags, it can adapt to different layouts, enhancing the user experience with a clear and responsive design. Whether using the redesigned or traditional layout, it ensures a consistent and effective display of article information.

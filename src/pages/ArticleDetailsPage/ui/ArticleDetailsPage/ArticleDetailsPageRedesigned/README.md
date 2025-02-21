# ArticleDetailsRedesignedPage

## Overview
The **`ArticleDetailsRedesignedPage`** module is a core component of the application responsible for presenting detailed information about a specific article. This page is designed according to the Feature-Sliced Design (FSD) methodology, ensuring that it maintains a structured and cohesive layout while efficiently displaying the article's content. The redesign emphasizes modern UI/UX practices, optimizing both the aesthetic and functional aspects of the article details page. This component is rendered when the feature flag `isAppRedesigned` is active, replacing the deprecated version.
## Type Definition
```typescript
interface ArticleDetailsPageProps {
    className?: string;
}
```

## Props
The **`ArticleDetailsRedesignedPage`** component accepts the following props:

| Prop        | Type     | Required / Optional | Description                             |
|-------------|----------|---------------------|-----------------------------------------|
| `className` | `string` | Optional            | Custom class name for additional styling. |

## Features
1. **Article Details Display**: Integrates the `ArticleDetailsPageContainer` component to dynamically render detailed content about the selected article, ensuring that all relevant information is presented clearly.

2. **Navigation Support**: Utilizes the `ArticleListNavigationButton` component to provide users with easy navigation options, allowing them to browse through different articles seamlessly.

3. **Additional Information**: Includes the `AdditionalInfoContainer` component on the right side of the layout, offering supplementary details or related content that enhances the user experience.

4. **Sticky Content Layout**: Implements the `StickyContentLayout` to maintain a consistent and accessible design, ensuring that key navigation and additional information remain visible as the user scrolls through the article.

5. **Component Memoization**: The `ArticleDetailsRedesignedPage` is memoized using `React.memo`, enhancing performance by preventing unnecessary re-renders when the component's props do not change.

## Conclusion
The `ArticleDetailsRedesignedPage` module is a vital component in delivering an engaging and informative article reading experience. By incorporating a `StickyContentLayout`, it ensures that users have continuous access to essential navigation and additional information, creating a smooth and user-friendly interface. The use of memoization optimizes performance, making this redesigned page both efficient and aesthetically pleasing. This component becomes the primary article details page when the `isAppRedesigned` feature flag is true, ensuring that users experience the latest UI enhancements and performance improvements.

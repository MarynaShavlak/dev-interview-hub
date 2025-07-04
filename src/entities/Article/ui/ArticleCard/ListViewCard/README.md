# ListViewCard

## Overview
The **`ListViewCard`** component dynamically switches between the `ListViewCardRedesigned` and `ListViewCardDeprecated` components based on the `isAppRedesigned` feature flag. 
This approach ensures that users interact with either the modern or legacy list view interface, depending on the current configuration of the application. By providing this flexibility, the component maintains a consistent user experience while transitioning between design systems.

## Type Definition 
```typescript
export interface ListViewCardProps {
    className?: string;
    article: Article;
}
```

## Props
The **`ListViewCard`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `article` | `Article`   | Required             | The article object containing details such as title, image, and date.              |
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |


## Features
1. **Feature Flag Driven**: The component adapts between the redesigned and deprecated grid view interfaces based on the `isAppRedesigned` feature flag, providing a seamless transition between different design systems.
2. **Consistent Article Presentation**: IEnsures that article details are displayed consistently, whether using modern or legacy components, maintaining a uniform browsing experience.

## Usage Example

```typescript jsx
import { ListViewCard } from '@/entities/Article';
import { ArticleCategories } from '@/entities/Article';
import { Article } from '../../../../model/types/article';
import { ArticleCategory, SectionType } from '../../../../model/consts/articleConsts';
import { testArticleData } from './testing';


const App = () => (
    <ListViewCard
        article={testArticleData}
        className="custom-item"
        target="_blank"
    />
);
```
## Conclusion
The **`ListViewCard`** component is crucial for rendering articles in a list layout, offering a flexible and adaptive interface that caters to both legacy and modern design systems. 
By leveraging the `isAppRedesigned` feature flag, the component seamlessly transitions between the `ListViewCardRedesigned` and `ListViewCardDeprecated` components, ensuring users receive a consistent and visually appealing experience irrespective of the application's design state. 
The component effectively presents article details such as title, image, creation date, and user avatar, maintaining a high level of detail and engagement. 
This adaptability not only enhances user experience but also supports the application's evolution, allowing for smooth upgrades and interface changes without disrupting the user interface. 
The `ListViewCard` component thus plays a pivotal role in ensuring that articles are displayed effectively and interactively, supporting both current and future design paradigms.

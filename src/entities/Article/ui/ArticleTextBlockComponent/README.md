# ArticleTextBlockComponent

## Overview
The **`ArticleTextBlockComponent`** is a React component designed to render blocks of text within an article. 
It supports conditional rendering based on feature flags to ensure compatibility with both legacy and modern UI designs. 
This component leverages `ToggleFeaturesComponent` to switch between the redesigned and deprecated text components, allowing for a seamless transition between different UI states. 
Additionally, it utilizes the `Each` component to iterate over and display multiple paragraphs within a text block.

## Type Definition 
```typescript
interface ArticleTextBlockComponentProps {
   className?: string;
   block: ArticleTextBlock;
}
```

## Props
The **`ArticleTextBlockComponent`** component accepts the following props:

| Prop       | Type      | Required / Optional | Description                                                                   |
|------------|-----------|----------------------|-------------------------------------------------------------------------------|
| `block` | `ArticleTextBlock` | Required            | The text block object containing the title and paragraphs to be displayed. |
| `className` | `string`  | Optional             | Custom class name for additional styling.                                     |

## Features
1. **Conditional Rendering**:
   - **Feature Toggling**: Utilizes `ToggleFeaturesComponent` to conditionally render either the `Text` component or the `TextDeprecated` component based on the `isAppRedesigned` feature flag.  This allows the component to adapt to different UI designs seamlessly.

2. **Title and Paragraph Display**:
   - **Title**: Renders the title of the text block if it exists, using the appropriate text component based on the feature flag.
   - **Paragraphs**: Iterates over the paragraphs in the text block and renders each one using the `renderText` function, which also respects the feature flag for conditional rendering.

## Usage Example
```typescript jsx
import { ArticleTextBlockComponent } from '@/entities/Article';
import { ArticleTextBlock } from '@/entities/Article';
import { SectionType } from '../consts/articleConsts';

const sampleTextBlock: ArticleTextBlock = {
   id: '1',
   type: SectionType.TEXT,
   title: 'Sample Title',
   paragraphs: [
      'This is the first paragraph.',
      'This is the second paragraph.',
      'This is the third paragraph.'
   ]
};

const ExampleComponent = () => {
   return (
           <div>
              <ArticleTextBlockComponent
                      className="customTextBlock"
                      block={sampleTextBlock}
              />
              {/* The ArticleTextBlockComponent handles the rendering of title and paragraphs with conditional UI states */}
           </div>
   );
};
```

## Conclusion
The **`ArticleTextBlockComponent`** is a versatile component for rendering text blocks within an article. It ensures compatibility with both legacy and modern UI designs through the use of feature toggling. This component is essential for maintaining a consistent user experience during transitions between different design systems. By effectively managing the rendering of titles and paragraphs, it provides a robust solution for displaying article content in a React application.

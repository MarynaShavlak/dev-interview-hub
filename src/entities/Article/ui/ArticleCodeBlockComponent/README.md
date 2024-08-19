# ArticleCodeBlockComponent

## Overview
The **`ArticleCodeBlockComponent`** is a React component designed to render blocks of code within an article. It supports conditional rendering based on feature flags to ensure compatibility with both legacy and modern UI designs. This component leverages `ToggleFeaturesComponent` to switch between the redesigned and deprecated code components, facilitating a smooth transition between different UI states.

## Type Definition 
```typescript
interface ArticleCodeBlockComponentProps {
   className?: string;
   block: ArticleCodeBlock
}
```

## Props
The **`ArticleCodeBlockComponent`** component accepts the following props:

| Prop       | Type      | Required / Optional | Description                                                                   |
|------------|-----------|----------------------|-------------------------------------------------------------------------------|
| `block` | `ArticleCodeBlock` | Required            | The code block object containing the code to be displayed. |
| `className` | `string`  | Optional             | Custom class name for additional styling.                                     |

## Features
1. **Conditional Rendering**:
   - **Feature Toggling**: Utilizes `ToggleFeaturesComponent` to conditionally render either the `Code` component or the `CodeDeprecated` component based on the `isAppRedesigned` feature flag.  This allows the component to adapt to different UI designs seamlessly.

2. **Code Display**:
   - **Code Block**: Renders the code block using the appropriate code component based on the feature flag, ensuring that the code is displayed correctly according to the current UI design.

## Usage Example
```typescript jsx
import { ArticleCodeBlockComponent } from '@/entities/Article';
import { ArticleCodeBlock } from '@/entities/Article';
import { ArticleSection } from '../consts/articleConsts';

const sampleCodeBlock: ArticleTextBlock = {
   id: '1',
   type: ArticleSection.CODE,
   code: `console.log('Hello, world!');`
};

const ExampleComponent = () => {
   return (
           <div>
              <ArticleCodeBlockComponent
                      className="customCodeBlock"
                      block={sampleCodeBlock}
              />
              {/* The ArticleCodeBlockComponent handles the rendering of code blocks with conditional UI states */}
           </div>
   );
};
```

## Conclusion
The **`ArticleCodeBlockComponent`** is a versatile component for rendering code blocks within an article. It ensures compatibility with both legacy and modern UI designs through the use of feature toggling. This component is essential for maintaining a consistent user experience during transitions between different design systems. 
By effectively managing the rendering of code blocks, it provides a robust solution for displaying code content in a React application.

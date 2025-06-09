# ArticleImageBlockComponent

## Overview
The **`ArticleImageBlockComponent`**  is a React component designed to render image blocks within an article. It includes support for displaying an image with an optional title, which adapts its rendering based on feature flags for different UI designs.
This component leverages `ToggleFeaturesComponent` to switch between the redesigned and deprecated code components, facilitating a smooth transition between different UI states.

## Type Definition 
```typescript
interface ArticleImageBlockComponentProps {
   className?: string;
   block: ArticleImageBlock;
}
```

## Props
The **`ArticleImageBlockComponent`** component accepts the following props:

| Prop       | Type      | Required / Optional | Description                                                                   |
|------------|-----------|----------------------|-------------------------------------------------------------------------------|
| `block` | `ArticleImageBlock` | Required            | The image block object containing the image source URL and an optional title. |
| `className` | `string`  | Optional             | Custom class name for additional styling.                                     |

## Features
1. **Conditional Rendering**:
   - **Feature Toggling**: Utilizes `ToggleFeaturesComponent` to conditionally render either the `Text` component or the `TextDeprecated` component based on the `isAppRedesigned` feature flag.  This allows the component to adapt to different UI designs seamlessly.

2. **Image Display**:
   - **Image**: Displays the image using an `img` element with the source URL and alt text provided by the `block` object.
   - **Title**: Renders the title of the image block if it exists. The title's text alignment and styling depend on the current feature flag, allowing for both modern and legacy UI presentations.

## Usage Example
```typescript jsx
import { ArticleImageBlockComponent } from '@/entities/Article';
import { ArticleImageBlock } from '@/entities/Article';
import { SectionType } from '../consts/articleConsts';

const sampleImageBlock: ArticleImageBlock = {
   id: '1',
   type: SectionType.CODE,
   src: 'path/to/image.jpg',
   title: 'Sample Image Title'
};

const ExampleComponent = () => {
   return (
           <div>
              <ArticleImageBlockComponent
                      className="customImageBlock"
                      block={sampleImageBlock}
              />
              {/* The ArticleImageBlockComponent handles the rendering of images with optional titles and adapts to different UI states */}
           </div>
   );
};
```

## Conclusion
The **`ArticleImageBlockComponent`** provides a flexible solution for rendering image blocks within an article. By supporting conditional rendering for titles based on feature flags, it ensures compatibility with both modern and legacy UI designs. This component is essential for maintaining visual consistency and adapting to different design systems, allowing for a seamless user experience across various application versions.

# StickyContentLayout

## Overview 
The `StickyContentLayout` component is a layout container that arranges its children in a three-column grid with sticky sidebars. 
It is designed to display a central content area with optional left and right sidebars that remain fixed while scrolling. 
This layout is useful for pages where additional information or navigation is provided alongside the main content.

##  Type Definition
```typescript
interface StickyContentLayoutProps {
    className?: string;
    left?: ReactElement;
    content: ReactElement;
    right?: ReactElement;
}
```

## Props
The `StickyContentLayoutProps` interface defines the following properties:

| Prop        | Type                                        |          Required / Optional          | Description                                                                 |
|-------------|---------------------------------------------|:-------------------------------------:|-----------------------------------------------------------------------------|
| `className` | `string`                                    |               Optional                | Additional CSS class names to apply to the main container.                       |
| `content`   | `ReactElement`                                    |               Required                | Main content to be displayed in the center area. This is the primary content area of the layout.                       |
| `left`      | `ReactElement`                                    |               Optional                | Content to be displayed in the left sidebar. If not provided, the left sidebar will be omitted.                         |
| `right`     | `ReactElement`                                    |               Optional                | Content to be displayed in the right sidebar. If not provided, the right sidebar will be omitted.                         |


## Usage Example

```typescript jsx
import { memo } from 'react';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout/StickyContentLayout';
const ExamplePage = memo(() => {
    return (
        <StickyContentLayout
            left={<div>Left Sidebar</div>}
            content={<div>Main Content</div>}
            right={<div>Right Sidebar</div>}
        />
    );
});

export default ExamplePage;
```

## Conclusion 
The `StickyContentLayout` component provides a flexible and responsive layout structure with sticky sidebars. 
It allows for easy integration of additional content areas alongside the main content, enhancing the user experience by keeping important information visible while scrolling. 
By using the `className` prop and default layout settings, developers can tailor the component to fit various design requirements and ensure a consistent presentation across different pages.

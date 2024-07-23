# MainLayout

## Overview 
The `MainLayou` component is a layout container designed to arrange its children into a three-column grid with a fixed sidebar and rightbar, and a central content area. It also includes an optional toolbar, which is positioned at the top of the rightbar. This layout is ideal for applications or pages where a structured layout with a fixed sidebar, content area, and additional header and toolbar elements is needed.

##  Type Definition
```typescript
interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
    toolbar?: ReactElement;
}
```

## Props
The `MainLayoutProps` interface defines the following properties:

| Prop        | Type                                        |          Required / Optional          | Description                                                                 |
|-------------|---------------------------------------------|:-------------------------------------:|-----------------------------------------------------------------------------|
| `className` | `string`                                    |               Optional                | Additional CSS class names to apply to the main container.                       |
| `header`    | `ReactElement`                                    |               Required                | Content to be displayed in the header area of the layout.                      |
| `content`   | `ReactElement`                                    |               Required                | Main content to be displayed in the central content area.                       |
| `sidebar`   | `ReactElement`                                    |               Optional                | Content to be displayed in the sidebar area.                        |
| `toolbar`   | `ReactElement`                                    |               Optional                | Content to be displayed in the toolbar area, located in the rightbar.                         |


## Usage Example

```typescript jsx
import { memo } from 'react';
import { MainLayout } from '@/shared/layouts/MainLayout/MainLayout';

const ExamplePage = memo(() => {
    return (
        <MainLayout
            header={<div>Header</div>}
            content={<div>Main Content</div>}
            sidebar={<div>Sidebar</div>}
            toolbar={<div>Toolbar</div>}
        />
    );
});

export default ExamplePage;
```

## Conclusion 
The `MainLayout` component offers a structured layout with a central content area, a fixed sidebar, and a rightbar with optional header and toolbar elements. This layout facilitates a clear separation of content and navigation elements, ensuring that key sections of the page remain visible while scrolling. 
By leveraging the `className` prop and default grid configuration, developers can customize the appearance of the `MainLayout` component to align with various design needs and maintain a consistent layout across different pages.

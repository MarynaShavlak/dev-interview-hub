# ScrollToolbar Widget

## Overview 
The `ScrollToolbar` widget is a versatile UI component that provides a toolbar with a central `ScrollToTopButton`. 
This toolbar enhances user experience by offering a consistent and easily accessible way to navigate back to the top of the page, particularly useful on long content pages. The toolbar is designed to be centered both horizontally and vertically within its container, providing an intuitive and user-friendly interface element.

##  Type Definition
```typescript
interface ScrollToolbarProps {
    className?: string;
}
```

## Props
The `ScrollToolbar` has the following props:

| Prop         | Type                                        |          Required / Optional          | Description                                                                |
|--------------|---------------------------------------------|:-------------------------------------:|----------------------------------------------------------------------------|
| `className`  | `string`                                    |               Optional                | Additional CSS class names to apply to the toolbar for styling.|


## Features
1. **Centered Layout**: The component uses the `VStack` from the Stack UI to center its content both horizontally and vertically. This ensures that the `ScrollToTopButton` is prominently displayed and easily accessible.
2. **ScrollToTopButton Integration**: The toolbar integrates the `ScrollToTopButton` component, providing users with a quick and smooth way to return to the top of the page.

## Usage Examples

```typescript jsx
import React from 'react';
import { ScrollToolbar } from '@/components/ScrollToolbar';

const ExamplePage = () => {
    return (
        <div>
            <div style={{ height: '1500px' }}>
                <p>Scroll down to see the toolbar</p>
            </div>
            <ScrollToolbar />
        </div>
    );
};

export default ExamplePage;
```

## Conclusion 
The `ScrollToolbar`widget enhances user navigation by providing a central toolbar with a `ScrollToTopButton`. This design ensures that users can easily and quickly return to the top of the page, improving the overall user experience on long content pages. The component's centered layout and flexible styling options make it a valuable addition to any application requiring efficient scroll management and user-friendly navigation tools.

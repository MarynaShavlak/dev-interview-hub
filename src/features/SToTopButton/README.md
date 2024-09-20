# ScrollToTopButton Feature

## Overview 
The `ScrollToTopButton` component is a UI element that provides users with a convenient way to quickly scroll back to the top of the page. This feature enhances user experience by allowing easy navigation, especially on pages with extensive content. When clicked, the button smoothly scrolls the window to the top, making it useful in applications where content length might require frequent scrolling.


##  Type Definition
```typescript
interface ScrollToTopButtonProps {
    className?: string;
}
```

## Props
The `ScrollToTopButton` has the following props:

| Prop         | Type                                        |          Required / Optional          | Description                                                                |
|--------------|---------------------------------------------|:-------------------------------------:|----------------------------------------------------------------------------|
| `className`  | `string`                                    |               Optional                | Additional CSS class names to apply to the button for styling.|


## Features
1. **Smooth Scrolling**: The component uses the `window.scrollTo` method with the `behavior` option set to `smooth`, ensuring a smooth scrolling effect when the button is clicked.
2. **Icon Display**: The button utilizes an `Icon` component to display a circular upward arrow, making its purpose immediately clear to users.


## Usage Example

This example demonstrates how to use the `Page` component with default settings. 
It includes a `data-testid` for testing and displays a simple message.
```typescript jsx
import React from 'react';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

const ExamplePage = () => {
    return (
        <div>
            <div style={{ height: '1500px' }}>
                <p>Scroll down to see the button</p>
            </div>
            <ScrollToTopButton />
        </div>
    );
};

export default ExamplePage;
```



## Conclusion 
The `ScrollToTopButton` component enhances user navigation by providing a quick and smooth way to return to the top of the page. By integrating this button, applications with extensive content can offer a better user experience, ensuring that users can easily navigate back to the top without excessive scrolling. The component's flexibility in styling allows it to be seamlessly integrated into various design schemes.

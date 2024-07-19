# 'Page' Component
## Overview 
The **'Page'** component is a container component that handles scrolling behavior and provides a mechanism for infinite scrolling. It manages the scroll position, supports feature toggling for styling, and provides a callback when the user scrolls to the end

## Interface 
The **'PageProps'** interface extends **'TestProps'** to include the optional **'data-testid'** property, allowing for easier identification and testing of the component in various testing environments
```typescript
interface PageProps extends TestProps {
    children: ReactNode;
    onScrollEnd?: () => void;
    className?: string;
}
```
- **'children'**: _Required_. React nodes to be rendered inside the main container.
- **'className'**: _Optional_. Additional CSS class names to apply to the main container.
- **'onScrollEnd'**: _Optional_. Callback function to be invoked when the user scrolls to the end of the container. Note that if the page does not have enough content to require scrolling, the onScrollEnd callback will not be set, as scrolling is not needed for such pages.


## Functionality
**Scroll Management**: The component tracks and sets the scroll position of the container. It initializes the scroll position on component mount using **'useInitialEffect'** and updates it during scrolling using a throttled **'onScroll'** handler.

**Infinite Scrolling**: The **'useInfiniteScroll'** hook is used to monitor when the user has scrolled to the end of the container. If **'onScrollEnd'** is provided and applicable (i.e., the page has enough content to require scrolling), it will be called when this event occurs.

**Feature Toggling and CSS Classes**: The component supports feature toggling to apply different styles based on the feature flag **'isAppRedesigned'**. Conditional class names are applied according to the feature toggle and any additional class names passed via props. This ensures that the component adapts its styling based on the current feature flag and any custom styling requirements.

**Feature Toggling for Infinite Scrolling**: The **'useInfiniteScroll'** hook's **'wrapperRef'** parameter is dynamically assigned based on the feature flag **'isAppRedesigned'**. If the feature is enabled, the **'wrapperRef'** is set to **'undefined'**, meaning that the infinite scrolling functionality will not use any specific element for scrolling. Instead, it will rely on the default scrolling behavior of the document. This configuration is used for the redesigned app's layout which  does not require custom scroll management.
Conversely, if the feature is disabled, **'wrapperRef'** is set to the container's reference (**'wrapperRef'**). This allows the **'useInfiniteScroll'** hook to monitor and manage scrolling within the specific container element, ensuring that the infinite scrolling behavior is applied appropriately.

**Test ID**: A **'data-testid'** attribute is provided for testing purposes, defaulting to **'Page'** if not specified.


## Usage Examples

### Example 1: Basic Usage
This example demonstrates how to use the **'Page'** component with default settings. 
It includes a **'data-testid'** for testing and displays a simple message.
```typescript
import React, { memo } from 'react';
import { Page } from '@/widgets/Page';

const MainPage = memo(() => {
       return (
        <Page data-testid="MainPage">
            <p>Main Page</p>
        </Page>
    );
});

export default MainPage;
```

### Example 2: Usage with Custom Class and Scroll Callback
This example demonstrates how to use the **'Page'** component with additional props. It adds a custom CSS class and includes a callback function that will be triggered when the user scrolls to the end of the page.
```typescript
import React, { memo } from 'react';
import { Page } from '@/widgets/Page';

const handleScrollEnd = () => {
    console.log('Scrolled to the end of the page!');
};

const MainPage = memo(() => {
       return (
           <Page
                data-testid="MainPage"
                className="custom-page-class"  // Custom CSS class
                onScrollEnd={handleScrollEnd}  // Callback for when scrolling ends
            > 
                    <p>Main Page</p>
            </Page
    );
});

export default MainPage;
```

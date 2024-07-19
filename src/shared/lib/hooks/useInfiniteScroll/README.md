# useInfiniteScroll Custom Hook
A custom React hook for implementing infinite scroll behavior using the IntersectionObserver API.

## Overview
The **'useInfiniteScroll'** hook facilitates infinite scrolling behavior in React components by invoking a specified callback when a trigger element intersects with a wrapper element.


## Parameters
- **'triggerRef'**: _Required_. A **'MutableRefObject'** referencing the trigger element that initiates loading more content.
- **'wrapperRef'**: _Optional_. A **'MutableRefObject'** referencing the scrollable wrapper element. If not provided, the viewport is used as the root.
- **'callback'**: _Optional_. A function to execute when the trigger element intersects with the viewport.


## Explanation
The **'useInfiniteScroll'** hook helps to detect when an element (the **'triggerRef**') comes into view, allowing you to execute a callback function (like loading more items) at that moment.

- The **'IntersectionObserver'** is used to observe the **'triggerRef'** element.
- When the **'triggerRef'** element intersects with the viewport or a specified **'wrapperRef'** element, the callback function is executed.
- The **'rootMargin'** and **'threshold'** can be adjusted within the **'options'** object to fine-tune the intersection conditions.


## Cleanup Logic
The **'useEffect'** hook in **'useInfiniteScroll'** includes a cleanup function that ensures the **'IntersectionObserver'** is properly disconnected when the component unmounts or when any dependencies change. This is important to avoid potential memory leaks and to ensure that observers are not left active when they are no longer needed.

- **Unmounting**: When the component using **'useInfiniteScroll'** is removed from the DOM, the cleanup function runs, and **'observer.current.unobserve(triggerElement)'** is called to disconnect the observer from the **'triggerRef'** element.
- **Dependency Change**: If any of the dependencies (**'callback'**, **'triggerRef'**, or **'wrapperRef'**) change, the cleanup function runs before the new effect is applied. This ensures that the old observer is cleaned up before a new one is created with the updated dependencies.

## Usage Example 
Here’s an example of how to use the **'useInfiniteScroll'** hook in a React component:
```typescript
import React, { useRef } from 'react';
import { useInfiniteScroll } from './useInfiniteScroll';

const InfiniteScrollComponent = () => {
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

    const loadMoreItems = () => {
        // Your logic to load more items
        console.log('Load more items');
    };

    useInfiniteScroll({
        callback: loadMoreItems,
        triggerRef,
        wrapperRef,
    });

    return (
        <div ref={wrapperRef} style={{ height: '400px', overflow: 'auto' }}>
            {/* Scrollable content here...*/}
            <div ref={triggerRef} style={{ height: '20px' }} />
        </div>
    );
};

export default InfiniteScrollComponent;
```
 
## Conclusion
By using the **'useInfiniteScroll'** hook, you can effortlessly implement infinite scrolling in your React application while managing resource usage efficiently. This hook enhances the user experience with smooth and seamless infinite scrolling, making it easier to handle large data sets or dynamic content loading in your applications.

## Benefits 

- **Customizable**: Control intersection behavior with **'rootMargin'** and **'threshold'** options.
- **Efficient**: Cleans up observers on component unmount or dependency changes to prevent memory leaks.
- **Easy Integration**: Requires minimal code to add infinite scrolling to your components.

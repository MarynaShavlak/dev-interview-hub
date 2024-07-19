# `useThrottle` Custom Hook 
The **`useThrottle`** hook is designed to limit the rate at which a function can be executed, helping to enhance performance and manage the frequency of actions triggered during events like scrolling. Here’s a detailed description of its functionality:

## Problem Addressed
For example, during scrolling, a large number of actions can be triggered continuously, which can:

1. Significantly degrade performance due to the excessive load.
2. Flood the debugging and analysis tools with numerous events, making it harder to track other important actions.

## Solution
The **`useThrottle`** hook employs throttling, a mechanism that ensures an event is executed at most once within a specified time interval. For instance, you might want to save the scroll position only once per second, preventing the system from being overwhelmed by constant event triggers every millisecond.

## Usage
The **`useThrottle`** hook accepts two parameters:

- **`callback`**: The event handler function you want to throttle.
   - **`args`**: The arguments to be passed to the **`callback`**. Since the argument types are initially unknown, they are passed using the **`...args: any[]`** syntax, effectively proxying them to the final callback.
- **`delay`**: The time interval (in milliseconds) within which the **`callback`** can be executed only once.



## Implementation
The hook returns a throttled version of the **`callback`** that maintains the desired rate of execution using a series of manipulations:

1. **State Management**: A reference **`throttleRef`** is created to store the state of whether the **`callback`** can be executed (**`false`** by default).

2. **Callback Execution**:

 - The **`callback`** is executed only if **`throttleRef`** is **`false`**.
 - After execution, **`throttleRef`** is set to **`true`**, preventing further executions.
 - A timeout is set for the specified **`delay`** duration, after which **`throttleRef`** is reset to **`false`**, allowing the callback to be executed again.

3. **Throttling Logic**:

If **`throttleRef`** is **`true`**, subsequent calls to the throttled function are ignored until the timeout expires.
This ensures the **`callback`** is executed at most once per specified delay.


## Usage Example
Here's an example demonstrating how to use the **`useThrottle`** hook in a functional React component. This example focuses on throttling a scroll event handler to save the scroll position once per 500 ms.
```typescript
import { useRef } from `react`;
import { useThrottle } from `./useThrottle`; // Adjust the import path as needed

const SimpleThrottledComponent = () => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    const handleScroll = (event: UIEvent<HTMLDivElement>): void => {
        console.log(`Scroll position:`, event.currentTarget.scrollTop);
    };

    const throttledScrollHandler = useThrottle(handleScroll, 500);

    return (
        <div 
            ref={wrapperRef}
            onScroll={throttledScrollHandler}
            style={{ height: `400px`, overflow: `auto` }}
        >
          {/* Scrollable content here... */}
          <div ref={triggerRef} style={{ height: `20px` }} />
        </div>
    );
};

export default SimpleThrottledComponent;
```

## Benefits
- **Performance Improvement**: Reduces the load on the system by limiting the frequency of function executions.
- **Easier Debugging**: Prevents flooding the debugging tools with excessive events, making it easier to analyze other actions.
- **Controlled Event Handling**: Ensures events like scroll positions are saved at controlled intervals, maintaining optimal performance.


This hook is particularly useful in scenarios where high-frequency events can cause performance issues, such as scrolling, window resizing, or rapid user interactions.

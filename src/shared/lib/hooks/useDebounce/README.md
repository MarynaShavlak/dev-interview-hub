# 'useDebounce' Custom Hook 
The **'useDebounce'** hook is a custom React hook that allows you to delay the execution of a function until after a specified delay has passed since the last time the function was invoked. This is particularly useful for scenarios where you want to limit the rate at which a function is called, such as handling search input or resize events.

## Problem Addressed
In many web applications, certain actions can trigger frequent updates that can lead to performance issues. For example, continuously handling user input events like **'onChange'** or **'onKeyUp'** in a search box can result in excessive API calls or computationally expensive operations. Without debouncing, these operations may overwhelm the application and lead to a poor user experience.


## Solution
The **'useDebounce'** hook provides a simple and effective solution to this problem by delaying the execution of the provided callback function. This ensures that the callback is only executed after a specified delay has passed since the last invocation, reducing the frequency of updates and improving performance.


## Usage
The **'useDebounce'**  hook accepts two arguments:
- **'callback'**: The event handler function to be executed after the delay.
    - **'args'**: The arguments to be passed to the **'callback'**. Since the argument types are initially unknown, they are passed using the **'...args: any[]'** syntax, effectively proxying them to the final callback.
- **'delay'**: The delay duration in milliseconds.


## Implementation
The **'useDebounce'** hook manages the delay between function executions by setting up and clearing a timer. This approach ensures that the provided callback function is only called after a specified delay, and any previous scheduled executions are canceled. Here's a breakdown of its implementation:

1. **State Management**: The hook uses a **'MutableRefObject'** to store the reference to the timer. This allows the timer to persist across re-renders without causing unnecessary re-renders.

2. **Callback Execution**: The provided callback function is executed after the specified delay has passed since the last invocation.

3. **Debounce Logic**: Debounce logic ensures that any previously set timer is cleared before setting a new one. This ensures that the callback function is only executed once after the delay period has passed without any new invocations.
   - When the hook's returned function is called, it first checks if there is an existing timer by evaluating **'timer.current'**.
   - If a timer is already set, it is cleared using **'clearTimeout'**. This prevents the previous callback execution from occurring.
   - A new timer is then created using **'setTimeout'** with the provided delay. This timer will call the callback function once the specified delay has passed since the last invocation.

The essence of debounce is to ensure that a function is not executed immediately with every call but rather after a pause of inactivity. Unlike throttling, which allows a function to be called at regular intervals (e.g., once per second), debouncing cancels the previous function call and sets a new one each time, only executing the callback after a specified delay has elapsed without any new calls

## Usage Example
Here's an example demonstrating how to use the **'useDebounce'** hook in a functional React component.
```typescript
import React, { useState } from 'react';
import { useDebounce } from './useDebounce';

const SearchComponent = () => {
    const [query, setQuery] = useState('');

    const handleSearch = useDebounce((searchQuery) => {
        // Make API call with searchQuery
        console.log('API call with:', searchQuery);
    }, 500);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        handleSearch(event.target.value);
    };

    return (
        <input 
            type="text" 
            value={query} 
            onChange={handleChange} 
            placeholder="Search..." 
        />
    );
};
```


## Benefits
- **Performance Improvement**: Reduces the number of times a function is executed, improving application performance.
- **Resource Efficiency**: Limits the frequency of expensive operations such as API calls or complex calculations.
- **Improved User Experience**: Provides a smoother and more responsive interface by avoiding unnecessary updates.


In essence, the  **'useDebounce'**  hook ensures that the callback function is only invoked after a specified delay has passed since the last call, and all previous calls within that delay are canceled. This prevents excessive execution and improves performance by limiting the rate at which the callback function is triggered.

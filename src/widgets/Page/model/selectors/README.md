# Documentation for 'getUIScroll' and 'getUIScrollByPath'
## Overview
These selectors are used to access and retrieve scroll position information from the Redux store. They are designed to work with the scroll state managed by the `scrollSlice` in the application.

## Import Statements
```typescript
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
```
- `createSelector`: A function from Redux Toolkit used to create memoized selectors.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.

## Selectors

`getUIScroll`
```typescript
export const getUIScroll = (state: StateSchema) => state.scroll.scroll;
```
- **Purpose**: This selector retrieves the `scroll` object from the Redux store state.
- **Parameters**:
  - `state`: The entire Redux store state, adhering to the `StateSchema` type.
- **Returns**: The `scroll` object, which contains scroll positions keyed by path


`getUIScrollByPath`
```typescript
export const getUIScrollByPath = createSelector(
    getUIScroll,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
```
- **Purpose**: This selector retrieves the scroll position for a specific path from the `scroll` object in the Redux store.
- **Parameters**:
  - **First Argument**: `getUIScroll` selector, which provides the `scroll` object.
  - **Second Argument**: A function that extracts the `path` parameter from the arguments.
  - **Third Argument**: A function that takes the `scroll` object and `path` string, and returns the scroll position for the given path. If the path does not exist in the `scroll` object, it defaults to `0`.
- **Usage**: This selector is used when you need to access the scroll position for a specific route or path in the application. It helps to keep track of the scroll position across different pages or views.


## Example Usage
```typescript jsx
import { useSelector } from 'react-redux';
import { getUIScrollByPath } from '@/model/selectors/getUIScroll';

const Component = () => {
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname));

    return (
        <div style={{ scrollTop: scrollPosition }}>
            {/* Your content here */}
        </div>
    );
};
```
In this example, `getUIScrollByPath` is used to retrieve the scroll position for the current path, which is then applied to a component's style or logic.


## Conclusion 
- `getUIScroll`: Retrieves the entire `scroll` object from the Redux state.
- `getUIScrollByPath`: Retrieves the scroll position for a specific path, defaulting to `0` if the path does not exist.

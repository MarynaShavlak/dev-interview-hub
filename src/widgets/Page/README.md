# Widget Page  Documentation

## Overview

The `Page` module provides a comprehensive solution for managing scrolling behavior within web applications, offering support for infinite scrolling and adaptable styling based on feature toggles. This module efficiently tracks scroll positions, enhancing user experience by providing a smooth interaction when navigating through content.

## Module Structure

The `Page` module is organized into several subdirectories, each playing a unique role in managing .....

```text
Page/
├── model/
│   ├── types/
│   │   └── ScrollSchema.ts
│   ├── selectors/
│   │   ├── getUIScroll.ts
│   └── slices/
│       └── scrollSlice.ts
├── ui/
│   ├── Page/
│   │   ├── Page.tsx
│   │   └── Page.module.scss
└── index.ts
```
## Detailed Description

### 1. `model/`: Core logic and data structures

- **`selectors/`**
  - [**getUIScroll.ts**](./model/selectors/README.md):  Retrieves scroll position information within the Redux store.
- **`slices/`**
    - [**scrollSlice.ts**](model/slices/README.md): Manages the Redux state for UI scroll positions across different application paths.
- **`types/`**
    - [**ScrollSchema.ts**](./model/types/README.md): Defines the schema for scroll positions, specifying the interface representing the UI scroll structure.

### 2. `ui/`: UI components

- **`Page/`**
    - [**Page.tsx**](./ui/Page/README.md): MThe main container component that handles scrolling behavior and provides a mechanism for infinite scrolling.
    - **Page.module.scss**: Styles for the `Page` component.
### 4. `index.ts`
- Entry point for the `Page` module, exporting component, reducer and type.

## Public API

- **Types**:
    - `UIScrollSchema`: Interface that contains a single property named scroll, which is of type `ScrollSchema`, storing the scroll positions for various pages.
- **Components**:
    - `Page`: Component for managing scroll behavior, supporting infinite scrolling, and adapting styling based on feature toggles.
- **Reducers**:
  - `scrollReducer`: Reducer for scroll position management.

## Conclusion
The `Page` module serves as a vital component for handling scroll behavior and infinite scrolling within web applications. 
Its architecture allows for efficient management of scroll positions, utilizing features like the `onScrollEnd` callback to enhance user interaction. 
The component also supports dynamic styling based on the `isAppRedesigned `feature flag, enabling flexible adaptations to meet different design requirements. 
By integrating hooks such as `useInfiniteScroll`, the `Page` module not only improves content display but also ensures a seamless and engaging experience for users as they navigate through various sections of the application. 
Its structured design, combining types, selectors, and UI components, makes the `Page` module an essential part of any web application's user interface.

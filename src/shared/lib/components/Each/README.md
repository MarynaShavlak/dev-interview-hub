# Each Component
## Overview
The `Each` component is a generic utility component designed to simplify the rendering of a list of items. It accepts a list of data and a rendering function, allowing you to specify how each item should be displayed.

## Purpose
The primary purpose of the `Each` component is to provide a convenient way to iterate over an array of items and render each item using a custom rendering function. This component abstracts the iteration logic, making it easier to handle lists in a consistent and reusable manner.

## Type Definition
```typescript
interface EachProps<T> {
    of: T[];
    render: (item: T, index: number) => ReactNode;
}
```

## Props
Here's the props table for the `Each` component:

| Prop         | Type                                          |  Required / Optional  | Description                                                                                         |
|--------------|-----------------------------------------------|:---------------------:|-----------------------------------------------------------------------------------------------------|
| `of`         | `T[]`                                         |       Required        | An array of items to be rendered. The type `T` represents the type of items in the array.           |
| `render`     | `(item: T, index: number) => ReactNode`       |       Required        | A function that defines how each item should be rendered. It receives the item and its index as arguments and returns a React node. |


## Usage
The `Each` component is used to iterate over an array and render each element based on the provided `render` function. Here’s an example of how to use it:

```jsx
import React from 'react';
import { Each } from './Each';

    const tabs = ['HTML', 'CSS', 'REACT'];

const App = () => (
  <Each
    of={tabs}
    render={(item, index) => (
      <div key={index}>{item}</div>
    )}
  />
);
```
In this example, the `Each` component iterates over the items array and renders each tab inside a div element.

## Key Features
- **Generics**: The component uses TypeScript generics `<T>` to handle various types of items, providing flexibility for different data structures.
- **Rendering Logic**: The `render` prop allows you to define custom rendering logic, which makes the component highly versatile.
- **Efficiency**: By using `Children.toArray`, the component ensures that the rendered output is properly normalized and can be used safely within the React tree.

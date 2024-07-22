# Loader (Deprecated)
Note: This component is deprecated. Please use the new component from the redesigned directory.

## Overview
The `Loader` component is a simple and flexible loading spinner designed for use in React applications. It provides a visual indicator of loading states, making it an essential component for enhancing user experience during data fetching or processing tasks.

## Props
The `Loader` component accepts the following props:


| Prop         | Type                                    |    Required / Optional    | Description                                        |
|--------------|-----------------------------------------|:-------------------------:|----------------------------------------------------|
| `className`  | `string`                                |          Optional         | Additional custom class names to style the loader. |

```jsx
import { Loader } from '@/shared/ui/deprecated/Loader';

export const LoaderExample = () => {
    return (
        <Loader />
    );
};
```

## Conclusion
The `Loader` component is a simple yet effective element designed to indicate loading states within React applications. Its straightforward implementation and customizable styling options make it a versatile choice for various use cases, ensuring a consistent and engaging user experience during data processing or fetching operations.

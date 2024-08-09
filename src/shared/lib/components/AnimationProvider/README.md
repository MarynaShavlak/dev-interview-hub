# AnimationProvider Component 

## Overview
The `AnimationProvider` component is designed to load animation libraries (**[Spring](https://www.react-spring.dev/)** and **[Gesture](https://use-gesture.netlify.app/)**) asynchronously and provide them to the rest of the application via React context. This ensures that the libraries are only loaded when needed, optimizing the application's performance.


## Component Structure
The `AnimationProvider` component is implemented as a React Context provider. It manages the state and references required to load and store the animation libraries, and provides a context value that can be accessed by consuming components.

## Types Definition
```typescript
type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');
```
## Interface 
```typescript
interface AnimationContextPayload {
    Gesture?: GestureType;
    Spring?: SpringType;
    isLoaded?: boolean;
}
```

The `AnimationContextPayload` interface defines the shape of the context value provided by the `AnimationProvider` component. It includes the following fields:
- `Gesture`: An optional field of type `GestureType` representing the `@use-gesture/react` library.
- `Spring`: An optional field of type `SpringType` representing the `@react-spring/web` library.
- `isLoaded`: An optional boolean field indicating whether the libraries have been successfully loaded.


This interface ensures that consuming components can safely access the animation libraries once they are loaded, while the `isLoaded` flag helps manage the loading state.

## Props
Here's the props table for the `AnimationProvider` component:

| Prop       | Type                                          |  Required / Optional  | Description                                                                                         |
|------------|-----------------------------------------------|:---------------------:|-----------------------------------------------------------------------------------------------------|
| `children` | `ReactNode`       |       Required        | The components that will have access to the animation libraries. |

## Key Features

- **Lazy Loading**: The libraries are loaded asynchronously, reducing the initial bundle size and improving application performance.
- **Context Provider**: The component provides a React context that makes the libraries available to any child component.
- **Custom Hook**: The `useAnimationLibs` hook simplifies access to the context values, ensuring that the fields are treated as non-optional and reducing the need for repeated type guards.
- **Memoization**: The context value is memoized to prevent unnecessary re-renders, ensuring efficient performance.

## Detailed Implementation
### Asynchronous Module Loading
The `getAsyncAnimationModules` function uses `Promise.all` to load the `@react-spring/web'/** and `@use-gesture/react` libraries in parallel.
```typescript
const getAsyncAnimationModules = async () => {
    return Promise.all([
        import('@react-spring/web'),
        import('@use-gesture/react'),
    ]);
};
```

### Custom Hook for Context Consumption
The `useAnimationLibs` hook provides access to the context, ensuring that the fields are treated as non-optional.
Since **Gesture** and **Spring** are loaded asynchronously, they may not be immediately available. To avoid constantly checking for undefined, the `useAnimationLibs` hook ensures that the returned fields are treated as non-optional. This requires careful monitoring of the `isLoaded` flag to determine if the libraries are available.
```typescript
export const useAnimationLibs = () => {
    return useContext(AnimationContext) as Required<AnimationContextPayload>;
};
```

## Usage Example
The `AnimationProvider` component is used to wrap parts of your application that require access to the animation libraries. Here’s an example of how to use it:

```typescript jsx
import { AnimationProvider, useAnimationLibs } from '@shared/components/AnimationProvider';

const AnimatedComponent = () => {
    const { Gesture, Spring, isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    // Use Gesture and Spring libraries as needed
    return (
        <div>
            {/* Your component logic */}
        </div>
    );
};

const App = () => (
    <AnimationProvider>
        <AnimatedComponent />
    </AnimationProvider>
);
```
## Conclusion
The `AnimationProvider` component manages the state and references required to load and store the animation libraries, and provides a context value that can be accessed by consuming components.



# AppImage 
## Overview
The `AppImage` component is a custom React component designed to handle image loading and error states gracefully. It extends the standard HTML `<img>` element by providing additional properties for custom fallbacks during loading and error states. This component is wrapped in `React.memo` to optimize performance by preventing unnecessary re-renders.


## Props
The `AppImage` component extends `ImgHTMLAttributes<HTMLImageElement>`, and it accepts the following additional props:

| props        | Type          | Required / Optional      | Description      |
| -------------| ------------- | :---: |--------------------------------------- |
| className    | string  | Optional          |Specifies a CSS class for the image element |
| fallback     | ReactElement  | Optional          |A React element to display while the image is loading. |
| errorFallback| ReactElement  | Optional           |A React element to display if the image fails to load. |

### Inherited Props
The component also inherits all standard HTML image attributes from `ImgHTMLAttributes<HTMLImageElement>`, such as `src`, `alt`, `width`, `height`, etc.

## Usage
### Basic Example

```typescript jsx
import React from 'react';
import { AppImage } from './AppImage';

const App = () => (
    <AppImage
        src="https://example.com/image.jpg"
        alt="Example Image"
        className="example-class"
        fallback={<div>Loading...</div>}
        errorFallback={<div>Error loading image</div>}
    />
);

export default App;
```
## Component Logic

The `AppImage` component uses the following state variables:

- `isLoading` - Tracks if the image is currently loading.
- `hasError` - Tracks if there was an error loading the image.

### `useLayoutEffect`

The `useLayoutEffect` hook is used to handle the image loading process.

It runs synchronously after all DOM mutations but before the browser has painted.
This ensures that the loading state is managed correctly even before the user sees the rendered output.

Inside the `useLayoutEffect`, a new **Image** object is instantiated. This `Image` object is not part of the DOM but is used to preload the image. The `src` attribute of the `Image` object is set to the `src` prop provided to the `AppImage` component. This action triggers the image loading process.

The `onload` event handler is defined to handle successful image loading. When the image loads successfully, it sets the `isLoading` state to **_false_**, indicating that the image has finished loading.

The `onerror` event handler is defined to handle image loading errors.
If the image fails to load, it sets the `isLoading` state to false and `hasError` state to **_true_*, indicating that an error occurred during the image loading process.
The `useLayoutEffect` hook has src as a dependency, so it will re-run the effect whenever the `src` prop changes.

### Rendering Logic
1. **Loading State:** If the image is still loading (`isLoading` is `true`) and a `fallback` element is provided, the `fallback` element is rendered.
2. **Error State:** If there was an error loading the image (`hasError` is `true`) and an `errorFallback` element is provided, the `errorFallback` element is rendered.
3. **Success State:** If the image has loaded successfully, the `<img>` element with the provided attributes and props is rendered.

## Conclusion 
The `AppImage `component is a versatile and robust solution for handling image loading in React applications. By providing fallback elements for both loading and error states, it ensures a smooth user experience even when image resources are unreliable or slow to load. Its use of `React.memo` for performance optimization and `useLayoutEffect` for precise control over the loading process make it a reliable choice for any application requiring dynamic image rendering. The component's flexibility in accepting standard HTML image attributes, along with custom fallbacks, allows it to be easily integrated and customized to fit various use cases.

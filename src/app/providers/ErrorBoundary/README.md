# ErrorBoundary Component

## Overview
The `ErrorBoundary` component in React is designed to catch JavaScript errors anywhere in its child component tree, log those errors, and display a fallback UI instead of crashing the entire application. It encapsulates error handling logic within a higher-order component, allowing the rest of the application to continue functioning even when errors occur.

## Role and Purpose:
The primary role of `ErrorBoundary` is to provide a graceful way to handle runtime errors that may occur during the rendering phase of React components. Its purpose is to prevent the entire application from crashing due to unhandled exceptions, thus improving the overall robustness and user experience of the application.


## Details of Implementation:

- **Props**

| Props      | Type           | Description        | 
|------------|----------------|--------------------|
| `children` | ReactNode | Required prop that represents the child elements wrapped by the `ErrorBoundary`.<br/> These are typically the components that need error handling. |


- **State**

| State      | Type    | Description        | 
|------------|---------|--------------------|
| `hasError` | boolean | Boolean state that tracks whether an error has occurred within its child components. |

- **Lifecycle Methods**:

| Method                                           | Parameters                               | Returns            | Description                                                                 |
|--------------------------------------------------|------------------------------------------|--------------------|-----------------------------------------------------------------------------|
| `static getDerivedStateFromError`  | `error: Error`                           | `object` or `null` | This static method is called when an error is thrown in a descendant component. <br/>It allows updating the state in response to the error.<br/> Specifically, it updates `hasError` in the state to `true`, triggering a re-render to display a fallback UI. |
| `componentDidCatch` | `error: Error`, `errorInfo: ErrorInfo`   | `void`             | This method is called after an error is caught by the component. <br/>It can be used to execute additional logic, such as logging the error to an analytics service like Sentry. <br/>This helps in monitoring and debugging application errors. |

## **Rendering Logic**:

In the `render()` method, the component checks if `hasError` is `true`. If so, it renders a fallback UI, wrapped in a `Suspense` component to handle loading states gracefully. The `PageError` component is displayed as the fallback UI, indicating to users that an error has occurred.

If `hasError` is `false`, it renders the child components normally, allowing the application to continue running without interruption.


## Usage 
To use `ErrorBoundary`, wrap it around components that are prone to errors or around the root of your application to catch errors across the entire app. 
It enhances reliability by ensuring that errors are isolated and managed effectively without disrupting the user experience.

### Usage Example 
```typescript jsx
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { ErrorBoundary } from './app/providers/ErrorBoundary';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'The root container was not found. FAILED to mount the react application',
    );
}

const root = createRoot(container);

root.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
    );
```

## Conclusion 
The `ErrorBoundary` component helps maintain application stability by handling errors gracefully and providing a fallback mechanism, thereby improving the overall reliability of React applications.

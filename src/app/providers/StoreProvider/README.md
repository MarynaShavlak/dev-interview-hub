# StoreProvider Component

## Overview
The `StoreProvider` component is essential for managing global state within a React application, utilizing Redux for state management. It encapsulates the Redux store creation and provides it to the entire React component tree via context, ensuring consistent state management across the application.

## Role and Purpose
The `StoreProvider` component initializes and provides the Redux store, enabling components to access and interact with the global state. It allows for dynamic injection of reducers and initial state configuration, facilitating flexible and scalable state management in complex applications.

## Details of Implementation

- **Props**

| Prop            | Type                                     | Required / Optional | Description                                                                                   |
|-----------------|------------------------------------------|---------------------|-----------------------------------------------------------------------------------------------|
| `children`      | `ReactNode`                              | Required            | The child components that will have access to the Redux store provided by this component.      |
| `initialState`  | `DeepPartial<StateSchema>`               | Optional            | The initial state of the Redux store, allowing preloaded state configuration.                 |
| `asyncReducers` | `DeepPartial<ReducersMapObject<StateSchema>>` | Optional            | Additional reducers that can be dynamically injected into the Redux store.                    |

- **Store Creation**
    - The `createReduxStore` function is utilized to create the Redux store. It accepts the `initialState` and `asyncReducers` as arguments, allowing the store to be configured dynamically.
    - The `Provider` component from `react-redux` is used to supply the created store to the component tree, ensuring that all child components can connect to the Redux store and access the global state.

## Usage

### Usage Example
```typescript jsx
import { createRoot } from 'react-dom/client';
import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'The root container was not found. FAILED to mount the react application',
    );
}

const root = createRoot(container);

root.render(
    <StoreProvider initialState={{ user: { isLoggedIn: true } }}>
        <App />
    </StoreProvider>,
);
```
## Conclusion 
The `StoreProvider` component is crucial for setting up and maintaining the Redux store in a React application. It provides a flexible and scalable solution for managing global state, allowing for dynamic configuration and ensuring that all components within the application can interact with the centralized state effectively.

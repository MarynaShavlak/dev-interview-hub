# Documentation for User Initialization  Selectors

## Overview
These selectors are designed to access and retrieve the user initialization status from the Redux store. They facilitate the management of user state initialization within the application, ensuring efficient data retrieval for operations that depend on whether the user state has been initialized

## Import Statements
```typescript
import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';
```
- `buildSelector`: A utility function for creating a selector that includes a hook for easier component integration.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.

## Selectors

### `useUserAuthData` and `getUserAuthData`
```typescript
export const [useUserInited, getUserInited] = buildSelector(
        (state: StateSchema) => state.user._inited,
);
```
- **Purpose**: These selectors retrieve the user initialization status from the Redux store state.
- **Parameters**:
  - `state`: The entire Redux store state, adhering to the `StateSchema` type.
- **Returns**: 
  - `getUserInited`: A selector function that returns the initialization status from the `user` object in the Redux store.
  - `useUserInited`: A custom hook that uses the `getUserInited` selector to retrieve the initialization status directly within React components.
- **Usage**:
  - `getUserInited`: Use this selector when you need to access the user initialization status in non-component code or for server-side operations.
  - `useUserInited`: Use this custom hook within React components to access the user initialization status directly from the Redux store. This hook simplifies user state management within components.

## Usage Examples 
`useUserAuthData` in Component
```typescript jsx
import { useUserInited } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLoader } from './components/AppContent/AppLoader';
import { AppContent } from './components/AppLoader/AppContent';

export function App() {
  const inited = useUserInited();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);

  return !inited ? <AppLoader /> : <AppContent />;
}
```

## Conclusion 
These utilities help in retrieving the user initialization status from the Redux state, making user state management efficient and streamlined within components and other parts of the application. By utilizing these selectors, you can effectively manage user state initialization, ensuring a seamless and responsive user experience.

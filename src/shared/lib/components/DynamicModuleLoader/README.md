# DynamicModuleLoader Component

## Overview
The `DynamicModuleLoader` component is a powerful utility for dynamically managing Redux reducers within a React application. It allows for the addition and removal of reducers at runtime, providing a way to load and unload Redux slices as needed. This is particularly useful for optimizing performance and managing state in large applications with modular features.

## Role and Purpose
The component enables the dynamic addition of reducers to the Redux store, ensuring that only the necessary reducers are loaded for a given context. This helps in reducing the initial bundle size and managing state more efficiently. It also supports the automatic removal of reducers when they are no longer needed, maintaining a clean and optimized state.

## Details of Implementation

### Props

| Prop                | Type              | Required / Optional           | Description                                                                                                                                                      |
|---------------------|-------------------|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `reducers`          | `ReducersList`    | Required                      | An object mapping reducer names to their respective reducer functions. These reducers will be dynamically added to the store.                                |
| `removeAfterUnmount`| `boolean`         | Optional <br/> (default: `true`) | Determines whether the reducers should be removed from the store when the component is unmounted. If set to `true`, the reducers will be removed upon unmount. |
| `children`          | `ReactNode`       | Required                      | The child components that will be rendered within the context of the dynamically loaded reducers.                                                             |

### Types
- **ReducersList**: A type defining an object where keys are state slice names (`StateSchemaKey`) and values are reducers.  The reducers are associated with their respective state slices.  `NonNullable<StateSchema[name]>` ensures that the type of state handled by the reducer is not `null` or `undefined`. It extracts the non-nullable type from the StateSchema interface corresponding to each key and ensures that the reducer does not handle `undefined` states, which might occur with optional state slices.
- **StateSchemaKey**: Represents keys of the `StateSchema`, used to identify different slices of state.
- **ReduxStoreWithManager**: Extends the standard `EnhancedStore` to include a `reducerManager` for dynamic reducer management.

### State Management
- **mountedReducers**: An object keeping track of which reducers are currently mounted in the store.
- **keysToRemove**: An array of state slice names whose reducers need to be removed from the store.

## Effects
1. **Add Reducers**:
    - When the component mounts, it checks if the reducers are already mounted using the `reducerManager.getMountedReducers()` method. For each reducer provided in the `reducers` prop, it will be added to the store if it is not already present.
    - The `dispatch` function is used to dispatch an initialization action for each newly added reducer.

2. **Remove Reducers**:
    - If `removeAfterUnmount` is `true`, when the component unmounts, the reducers will be removed from the store. This ensures that the store remains clean and only contains reducers that are currently needed.
    - The `dispatch` function is used to dispatch a destruction action for each removed reducer.

## Usage Example

```typescript jsx
import { memo } from 'react';
import { ArticlesPageRedesigned } from './ArticlesPageRedesigned/ArticlesPageRedesigned';
import { ArticlesPageDeprecated } from './ArticlesPageDeprecated/ArticlesPageDeprecated';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';

export interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<ArticlesPageRedesigned className={className} />}
                off={<ArticlesPageDeprecated className={className} />}
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
```

## Conclusion
The `DynamicModuleLoader` component provides a flexible and efficient approach to managing Redux reducers. By enabling dynamic loading and unloading of reducers, it helps optimize performance and manage application state effectively. This component is particularly useful for applications with modular features that require state management in a dynamic and scalable manner.

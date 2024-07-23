# useAppToolbar hook
A custom React hook designed to conditionally render a `ScrollToolbar` widget based on the current application route. 
It leverages the `useRouteChange` hook to determine the active route and maps specific routes to their corresponding toolbar components.

## Parameters
This hook does not accept any parameters directly. It relies on the `useRouteChange` hook to get the current application route.

## Returns
A React element representing the toolbar component to be rendered for the current application route, or `undefined` if no toolbar is associated with the route.


## Internal Behavior
1. **Route Detection**:
    - Uses the `useRouteChange` hook to get the current application route (`appRoute`).

2. **Toolbar Mapping**:
    - Defines a mapping (`toolbarByAppRoute`) between specific application routes (`AppRoutes`) and their corresponding toolbar components.
    - Currently, it maps the `ARTICLES` and `ARTICLE_DETAILS` routes to the `ScrollToolbar` component.

3. **Conditional Rendering**:
    - Returns the toolbar component associated with the current application route. If no toolbar is mapped to the route, it returns `undefined`.

## Usage Example 
```typescript jsx
import { Suspense } from 'react';
import { useAppToolbar } from './lib/useAppToolbar/useAppToolbar';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

function App() {
    const toolbar = useAppToolbar();

    return (
        <div id="app">
            <Suspense fallback="">
                <MainLayout
                    header={<Navbar />}
                    content={<AppRouter />}
                    sidebar={<Sidebar />}
                    toolbar={toolbar}
                />
            </Suspense>
        </div>
    );
}

export default App;
```
## Conclusion
The `useAppToolbar` hook simplifies the process of rendering toolbars based on the current application route. By mapping specific routes to their corresponding toolbar components, it ensures that the correct toolbar is displayed only when needed.

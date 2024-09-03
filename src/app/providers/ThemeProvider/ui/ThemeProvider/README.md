# ThemeProvider Component

## Overview
The `ThemeProvider` component centralizes theme management within a React application by offering a context-based solution for theme control. It initializes and updates the application's theme while ensuring that user preferences are preserved across sessions and applied consistently throughout the component tree.

## Role and Purpose:
The component maintains and provides the current theme via context, allowing for dynamic updates and persistence of theme settings. 
It ensures a seamless user experience by applying theme changes globally and storing preferences in local storage.

## Details of Implementation:

- **Props**

| Prop       | Type      | Required / Optional                     | Description                                          |
|------------|-----------|-----------------------------------------|------------------------------------------------------|
| `children`  | `ReactNode` | Required                                | The child components that will have access to the theme context provided by this component.       |
| `initialTheme` | `Theme`   | Optional <br/> (default: `Theme.LIGHT`) | The current theme being used in the application, which affects the body class and is stored in local storage          |

- **State**

| State      | Type    | Description        | 
|------------|---------|--------------------|
| `isThemeInited` | boolean | A boolean state that indicates if the theme has been initialized with user settings. |
| `theme` | `Theme` | A boolean state that indicates if the theme has been initialized with user settings. |


## **Effects**:
  1. **Initialize Theme**:
     The `ThemeProvider `component determines the initial theme through the following mechanisms:
     - `fallbackTheme`:
       - The `fallbackTheme` is derived from the theme value stored in local storage. 
         When the component mounts, it attempts to retrieve the stored theme using `localStorage.getItem(LOCAL_STORAGE_THEME_KEY)`.
         If a theme is found, it is used as the fallback theme.
     - `Initial Theme`:
       - If an `initialTheme` is provided and the theme has not been initialized (`!isThemeInited`), the component sets the theme to this value and updates the `isThemeInited` state to `true`.
     - `Default to Light Theme`:
       - If no `initialTheme` is provided or the theme is not initialized, the component uses the `fallbackTheme` from local storage or defaults to `Theme.LIGHT` if none is available. This ensures a consistent theme is always applied.

     This approach allows the ThemeProvider to manage both user-specific and default themes, providing a consistent theming experience.

  2. **Apply Theme**:
  - Updates the `document.body` class and `localStorage` with the current theme whenever the theme state changes, ensuring that theme changes are reflected globally and persisted across sessions.

## **Context**:
The `ThemeProvider` uses `ThemeContext` to provide the current theme and a function to update it. 
- This context can be consumed by other components to access or modify the theme


## Usage 

### Usage Example 
```typescript jsx
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import App from './app/App';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'The root container was not found. FAILED to mount the react application',
    );
}

const root = createRoot(container);

root.render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
);
```

## Conclusion 
The `ThemeProvider` component ensures a consistent and personalized theming experience across the application. By managing theme initialization and updates both from user preferences and local storage, it facilitates a smooth and user-friendly theming experience.

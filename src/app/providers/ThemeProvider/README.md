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
         If a theme is found, it is used as the fallback theme. This allows the component to persist the user's last chosen theme across sessions.
     - `defaultTheme`:
       - The `defaultTheme` is retrieved using the `useJsonSettings` hook, which fetches the user's preferred theme from a JSON settings source. 
         This represents the theme that the user has specifically set or saved in their settings. 
         If a `defaultTheme` is provided and the theme has not been initialized (`!isThemeInited`), the component sets the theme to this value and marks the theme as initialized.
     - Role in Initializing the Theme:
       - Upon mounting, the `ThemeProvider` first checks if a `defaultTheme` is available. 
         If so, it sets the theme to this value and updates the `isThemeInited` state to true.
         This ensures that any user-specific or application-specific theme settings are applied immediately.
       - If no `defaultTheme` is provided or the theme is not initialized, the component falls back to using the `fallbackTheme` from local storage. 
         If neither is available, the theme defaults to `Theme.LIGHT`. 
         This ensures that there is always a theme applied, even if no previous settings are found.
  
  By using both `fallbackTheme` and `defaultTheme`, the `ThemeProvider` ensures that the theme is both user-specific and persistent across sessions, providing a consistent and personalized theming experience.

2. Apply Theme:
     - Updates the `document.body` class and `localStorage` with the current theme whenever `theme` changes.



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
The `ThemeProvider` component ensures a consistent theme across the application, utilizing both initial props and local storage. It dynamically updates the theme based on user interactions and application settings, providing an easy way to manage theming in a React app.

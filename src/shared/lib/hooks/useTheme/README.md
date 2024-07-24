# useTheme hook
The `useTheme` hook is designed to manage and toggle the theme of an application. 
It leverages the `ThemeContext` to provide access to the current theme and a method to change it. 
The hook cycles through three predefined themes: Dark, Light, and Orange.

##  Problem Addressed
Managing and toggling themes in an application can become cumbersome, especially when handling multiple themes. Without a proper mechanism, developers might face issues such as:

1. Inconsistent theme management across various components.
2. Complexity in theme switching logic and persistence.
3. Difficulty in synchronizing the theme state with external systems or storage.

## Solution
The `useTheme` hook streamlines theme management by providing:

1. Easy access to the current theme and a function to toggle between predefined themes.
2. A consistent method for updating and saving the theme state.
3. The ability to integrate with external actions or storage, ensuring persistence across sessions and devices.

## Parameters
The `useTheme` hook does not accept any parameters.

## Returns
An object with the following properties:

| Property    | Type       | Description                                                      |
|-------------|--------------------------|------------------------------------------------------------------|
| `theme` | `Theme`      | The current theme. Defaults to `Theme.LIGHT` if no theme is set. |
| `toggleTheme ` | `(saveAction?: (theme: Theme) => void) => void)`      | A function to toggle the theme. It accepts an optional callback function `saveAction` that is called with the new theme as an argument after the theme is toggled. |

## Internal Behavior
1. **Context Access**:
   The hook uses the `useContext` hook to access the `ThemeContext`, which provides the current theme and a function to set the theme.

2. **Theme Toggle Logic**:
   The `toggleTheme` function cycles through three themes: Dark, Light, and Orange. 
   When called, it determines the next theme based on the current theme and updates the context with the new theme.

3. **Optional Save Action**:
   If provided, the `saveAction` callback is invoked with the new theme after the theme has been updated in the context.

## Usage Example 
### Example 1: Basic `useTheme`  usage 
This example showcases the usage of the `useTheme` custom hook without providing a `saveAction` function. 
The `useTheme` hook is used to access the current theme, and the application layout adjusts accordingly.

```typescript jsx
import React, { Suspense } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from '../../providers/router';

export const AppContent = () => {
    const { theme } = useTheme();

    return (
            <div id="app" className={classNames('app', {}, [theme])}>
               <Suspense fallback="">
                  <Navbar />
                  <div className="content-page">
                     <Sidebar />
                     <AppRouter />
                  </div>
               </Suspense>
            </div>
    );
};
```

### Example 2: `useTheme` with Provided `saveAction` Function

This example showcases the usage of the `useTheme` custom hook with a provided `saveAction` function. 
The `saveAction` function saves the new theme to the application's settings via a dispatched Redux action, ensuring that the chosen user theme persists across different browsers and devices.

```typescript jsx
import React, { memo, useCallback } from 'react';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [dispatch, toggleTheme]);

    return (
        <Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />
    );
});
```
## Conclusion
The `useTheme` hook simplifies the management and toggling of themes in a React application.
By leveraging the `useTheme` hook, developers can enhance the user experience with seamless theme switching, ensure consistency in theme management, and integrate theme changes with external systems or storage solutions.

# ThemeContext 

## Purpose
The `ThemeContext` serves as a central store for theme information, allowing various components within the React application to access and update the current theme without having to pass props down through multiple levels of the component tree. 
By utilizing React's context API, the theme can be managed more efficiently and in a more organized manner.

## Interface
```typescript
export interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
}
```
`ThemeContextProps` is an interface defining the shape of the context value. It contains:
- `theme?`: An optional property of type `Theme` representing the current theme.
- `setTheme?`: An optional method that takes a `Theme` as an argument and returns void. This function is intended to update the theme.

## Creating the Context:
The `ThemeContex`t is created using the `createContext` function from the React library and initialized with an empty object `{}`. 
This context is typed with `ThemeContextProps`, ensuring that any value provided matches the defined interface.

The `ThemeContext` is designed to manage and provide theme information across a React application. 
It encapsulates the current theme and a method to update the theme, enabling efficient handling of theme settings throughout the application.

## Usage Example
1. Providing the Context:
```typescript jsx
import { useState } from 'react';
import { ThemeContext, ThemeContextProps } from './path/to/ThemeContext';
import { Theme } from '../../const/theme';

const App = () => {
  const [theme, setTheme] = useState<Theme>('light');

  const value: ThemeContextProps = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <YourComponent />
    </ThemeContext.Provider>
  );
};

export default App;
```
2. Consuming the Context:
```jsx 
import { useContext } from 'react';
import { ThemeContext } from './path/to/ThemeContext';

const YourComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme && setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default YourComponent;
```

## Conclusion
The `ThemeContext` provides a flexible and efficient way to manage theme settings in a React application. 
By defining a clear interface and utilizing React's context API, the theme can be easily accessed and modified throughout the application, enhancing the user experience and maintaining a consistent look and feel.

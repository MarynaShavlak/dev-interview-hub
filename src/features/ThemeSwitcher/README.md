# ThemeSwitcher

## Overview
The **`UThemeSwitcher`** component allows users to toggle between multiple themes in an application, providing a flexible and customizable user interface. It supports themes including **LIGHT**, **DARK**, and **ORANGE** themes, a, and adapts its display based on the current theme selection. 
By utilizing feature flags, the component can also handle different versions of the interface to enhance user experience.

## Type Definition 
```typescript
interface ThemeSwitcherProps {
    className?: string;
}
```

## Props
The **`ThemeSwitcher`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                          |
|------------|------------|----------------------|------------------------------------------------------|
| `className` | `string`   | Optional             | Custom class name for additional styling.           |


## Features
1.**Dynamic Theme Switching**: Allows users to toggle between the following themes:
    - **LIGHT**: A light color scheme for improved readability in well-lit environments.
    - **DARK**: A dark color scheme for reduced eye strain in low-light conditions.
    - **ORANGE**: A distinctive orange color scheme for a unique visual experience.


2.**Conditional Rendering**: Adjusts the rendered UI elements based on whether the redesigned interface (`isAppRedesigned` feature flag) is enabled.

3.**State Management**: Utilizes the `useTheme` hook to handle theme changes and the `useAppDispatch` hook to persist the theme preference through `saveJsonSettings`.

## Usage Example
```typescript jsx
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher';

const App = () => (
    <div>
        <ThemeSwitcher className="my-custom-class" />
        {/* The ThemeSwitcher component allows users to toggle between LIGHT, DARK, and ORANGE themes */}
    </div>
);
```
## Conclusion
The **`ThemeSwitcher`** component is an essential tool for managing and switching themes within an application
By supporting **LIGHT**, **DARK**, and **ORANGE** themes and integrating with feature flags, it offers a customizable and user-friendly theming experience. 
Its robust state management and clear visual indicators contribute to a smooth and adaptable interface for users.

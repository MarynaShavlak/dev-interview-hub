# AppLink (Deprecated )
Note: This component is deprecated. Please use the new component from the redesigned directory.

## Overview
The `AppLink` component is a versatile and customizable link component designed for React applications.
It leverages `react-router-dom` to provide navigation capabilities and supports various visual styles and states, making it a fundamental component for creating interactive and consistent user interfaces.

## Type Definitions
The types used in the `AppLink` component are defined as follows:
```typescript
export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}
```
## Props
The `AppLink`component extends LinkProps from `react-router-dom` and accepts the following props:

| Prop              | Type           |       Required / Optional       | Description                                                         |
|-------------------|----------------|:-------------------------------:|---------------------------------------------------------------------|
| `to`              | `string`       |            Required             | The destination URL to which the link points.                     |
| `children`        | `ReactNode`    |            Required             | The content to be displayed inside the link.              |
| `theme`           | `AppLinkTheme` | Optional (default: `'PRIMARY'`) | Determines the visual style of the link.                       |
| `className`       | `string`                                   |            Optional             | Additional custom class names to style the link.                    |
| `otherProps`      | `LinkProps`   |            Optional             | Any additional link HTML attributes.                             |

## Features
- **Ref Forwarding**: The `AppLink` component uses `forwardRef` to enable ref forwarding. This is particularly important in scenarios where the link needs to integrate with external libraries or components that rely on refs for internal operations, such as the `Menu` component from **[Headless UI](https://headlessui.com/)**.
  Using `forwardRef` allows the link to forward refs to its underlying HTML element, making it compatible with components that require a ref to be passed down. This is crucial for ensuring that the link functions correctly within complex UI libraries and maintains compatibility with various interactive elements.


## Usage Examples
### Example 1 : AppLink with secondary styles
```jsx
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';

export const AppLinkExample = () => {
    return (
        <AppLink to="/main" theme={AppLinkTheme.SECONDARY}>
            Go to Main Page
        </AppLink>
    );
};
```

### Example 2: AppLink with Headless UI Menu
```jsx
import { Menu } from '@headlessui/react';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecatedAppLink';

export const AppLinkWithHeadlessUIMenuExample = () => {
    const menuItems = [
        { href: '/main', label: 'Main', disabled: false },
        { href: '/admin', label: 'Admin', disabled: true },
    ];

    return (
        <Menu>
            {menuItems.map((item) => (
                <Menu.Item as={AppLink} to={item.href} disabled={item.disabled} key={item.href}>
                    {item.label}
                </Menu.Item>
            ))}
        </Menu>
    );
};
```

## Conclusion
The `AppLink` component is a flexible and powerful link element designed to fit various use cases within React applications. 
Its range of customization options—including multiple themes allows developers to create links that are both visually appealing and functionally effective. 
The ability to forward refs ensures that the link can integrate seamlessly with external libraries and complex UI components, making the `AppLink` component an essential tool for building consistent and interactive user interfaces.

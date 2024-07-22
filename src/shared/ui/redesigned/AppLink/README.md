# AppLink
## Overview
The `AppLink` component is a versatile and customizable link component designed for React applications. It leverages `react-router-dom` to provide navigation capabilities and supports various visual styles and states, making it a fundamental component for creating interactive and consistent user interfaces.

## Type Definitions
The types used in the `AppLink` component are defined as follows:
```typescript
export type AppLinkVariant = 'primary' | 'red';
```
## Props
The `AppLink`component extends LinkProps from `react-router-dom` and accepts the following props:


| Prop | Type            |       Required / Optional       | Description                                                         |
|------|-----------------|:-------------------------------:|---------------------------------------------------------------------|
| `to` | `string`        |            Required             | The destination URL to which the link points.                     |
| `children`   | `ReactNode`     |            Required             | The content to be displayed inside the link.              |
| `variant`    | `AppLinkVariant` | Optional (default: `'primary'`) | Determines the visual style of the link.                       |
| `className`  | `string`                                    |            Optional             | Additional custom class names to style the link.                    |
| `activeClassName`  | `string`                                    |     Optional(default: `''`)     | Class name to apply when the link is active.                    |
| `otherProps` | `LinkProps`   | Optional            | Any additional link HTML attributes.                             |

## Features
- **Active State Handling**: Use the `activeClassName` prop to apply specific styles when the link is active, enhancing user experience and navigation feedback.

- **Ref Forwarding**: The `AppLink` component uses `forwardRef` to enable ref forwarding. This is particularly important in scenarios where the link needs to integrate with external libraries or components that rely on refs for internal operations, such as the `Menu` component from **[Headless UI](https://headlessui.com/)**.
  Using `forwardRef` allows the link to forward refs to its underlying HTML element, making it compatible with components that require a ref to be passed down. This is crucial for ensuring that the link functions correctly within complex UI libraries and maintains compatibility with various interactive elements.


## Usage Examples
### Example 1 : Basic AppLink with active class
```typescript jsx
import { AppLink } from '@/shared/ui/redesigned/AppLink';

export const BasicAppLinkExample = () => {
    return (
        <AppLink to="/main" activeClassName="active-link">
            Go to Main Page
        </AppLink>
    );
};
```

### Example 2: AppLink with Headless UI Menu
```typescript jsx
import { Menu } from '@headlessui/react';
import { AppLink } from '@/shared/ui/redesigned/AppLink';

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
The `AppLink` component is a flexible and powerful link element designed to fit various use cases within React applications. Its range of customization options—including multiple variants and active state handling—allows developers to create links that are both visually appealing and functionally effective. The ability to forward refs ensures that the link can integrate seamlessly with external libraries and complex UI components, making the `AppLink` component an essential tool for building consistent and interactive user interfaces.

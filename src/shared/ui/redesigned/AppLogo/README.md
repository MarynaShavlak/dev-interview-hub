# AppLogo 
## Overview
The `AppLogo` component is a customizable and visually appealing logo designed for a React application. It allows developers to easily integrate a scalable and stylized logo into their projects, enhancing the visual identity and branding of the application.

## Type Definitions
The types used in the `AppLogo` component are defined as follows:
```typescript
interface AppLogoProps {
    className?: string;
    size?: number;
}
```

## Props
The `AppLogo` component  accepts the following props:

| Prop        | Type     |      Required / Optional      | Description                                                |
|-------------|----------|:-----------------------------:|------------------------------------------------------------|
| `className` | `string` |           Optional            | Additional custom class names to style the logo container. |
| `size`      | `number` | Optional <br/>(default: `50`) | Specifies the size of the logo (width and height in pixels).  |

## Usage Examples

```typescript jsx
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';

export const CustomAppLogoExample = () => {
    return (
        <AppLogo className="custom-logo-class" size={100} />
    );
};
```

## Conclusion
The `AppLogo` component provides a flexible and stylish solution for integrating a logo into a React application. Its customizable size and class name props, combined with its visually appealing design, make it an essential component for enhancing the branding and visual identity of the application. By leveraging the `HStack` component for central alignment and including dynamic gradient backgrounds, the `AppLogo` component ensures a polished and professional look.

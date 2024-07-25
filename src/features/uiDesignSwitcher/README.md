# UiDesignSwitcher

## Overview
The **`UiDesignSwitcher`** component provides a user interface for switching between a redesigned and a legacy version of an application interface. 
It dynamically adjusts the UI based on user preferences and feature flags, enhancing the flexibility and user experience of applications that support multiple design versions.

## Type Definition 
```typescript
interface UiDesignSwitcherProps {
    className?: string;
}
```

## Props
The **`UiDesignSwitcher`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                          |
|------------|------------|----------------------|------------------------------------------------------|
| `className` | `string`   | Optional             | Custom class name for additional styling.           |


## Features
1.**Dynamic Design Switching**: Users can toggle between the redesigned and legacy interfaces based on feature flags. This allows for gradual rollouts or user-specific customization of the UI.

2.**Loading State**: While switching between designs, the component displays a loading state using `Skeleton` components to indicate that a transition is in progress. This ensures a smooth user experience by providing visual feedback during asynchronous operations.

3.**Feature Flag Integration**: The component uses `getFeatureFlag` to determine the current design state and `updateFeatureFlag` to save user preferences. This integration ensures that design changes are consistent with the application's feature flag system and persist across sessions.

4.**Conditional Rendering**: The component renders different UI elements based on whether the redesigned interface is enabled or not.

5.**User Authentication**: It leverages `useUserAuthData` to apply design preferences specific to the authenticated user, ensuring that each user's choice is respected and maintained.

6.**State Management**: The component manages its loading state using `useState` and forces updates with `useForceUpdate` to ensure that UI changes are promptly reflected without relying on traditional state management techniques.

## Usage Example
```typescript jsx
import { UiDesignSwitcher } from '@/shared/ui/redesigned/UiDesignSwitcher';

const App = () => (
    <div>
        <UiDesignSwitcher className="my-custom-class" />
        {/* The UiDesignSwitcher component allows users to switch between design versions */}
    </div>
);
```
## Conclusion
The **`UiDesignSwitcher`** component is a powerful tool for managing UI design variations based on feature flags and user preferences. Its support for dynamic design switching, user-specific settings, and seamless integration with the feature flag system make it an essential component for modern, adaptable user interfaces. By incorporating loading states and conditional rendering, it ensures a responsive and user-friendly experience while handling design transitions effectively.

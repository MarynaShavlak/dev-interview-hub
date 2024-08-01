# LangSwitcher Feature

## Overview
The **`LangSwitcher`** component provides a user interface for toggling between different languages in an application. It adapts based on the application's design theme, allowing users to switch languages seamlessly and enhance localization support.

## Type Definition 
```typescript
interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}
```

## Props
The **`LangSwitcher`** component accepts the following props:

| Prop       | Type      | Required / Optional | Description                                          |
|------------|-----------|----------------------|------------------------------------------------------|
| `className` | `string`  | Optional             | Custom class name for additional styling.           |
| `short	` | `boolean` | Optional             | If `true`, displays a shortened language label.          |


## Features
1.**Language Toggling**:Allows users to switch between English (`'en'`) and Ukrainian (`'uk'`) languages, supporting dynamic localization.

2.**Translation Integration**: Utilizes `react-i18next` to manage language changes and translations, ensuring real-time updates based on user preferences.

3.**Design Adaptation**: Renders different UI elements based on whether the redesigned interface is enabled or not. This ensures consistency with the application's design system.

4.**Shortened Labels:**: The `short` prop provides a flexible option for displaying a condensed language label, useful for optimizing UI space.

## Usage Example
```typescript jsx
import { LangSwitcher } from '@/features/LangSwitcher';

const App = () => (
    <div>
        <LangSwitcher className="my-custom-class" short={false} />
        {/* The LangSwitcher component allows users to toggle between languages */}
    </div>
);
```
## Conclusion
The **`LangSwitcher`** component is an essential tool for enabling language localization within an application.
Its support for dynamic language switching, integration with translation libraries, and adaptability to different design systems make it a versatile component. 
By offering both shortened and standard labels, it provides flexibility in UI design and ensures a seamless user experience in multi-language applications.

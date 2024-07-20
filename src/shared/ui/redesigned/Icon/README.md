# Icon Component 
## Overview 
The **`Icon`** component is a versatile and reusable React component designed to render SVG icons. It supports both clickable and non-clickable variants, providing flexibility for various use cases within your application.


## Interface
The types used in the **`Icon`** component are defined as follows:
- **`SvgProps`**: A type that omits the **`onClick`** property from the standard **`React.SVGProps<SVGSVGElement>`** type.
    ```typescript
    type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;
    ```
- **`IconBaseProps`**: An interface extending **`SvgProps`** with additional properties for the icon's base configuration.
    ```typescript
    interface IconBaseProps extends SvgProps {
        className?: string;
        Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    }
    ```
- **`NonClickableIconProps`**: An interface extending **`IconBaseProps`** for non-clickable icons, with **`clickable`** set to **`false`**.
    ```typescript
    interface NonClickableIconProps extends IconBaseProps {
        clickable?: false;
    }
    ```
- **`ClickableBaseProps`**: An interface extending **`IconBaseProps`** for clickable icons, with **`clickable`** set to **`true`** and an **`onClick`** handler.
    ```typescript
    interface ClickableBaseProps extends IconBaseProps {
        clickable: true;
        onClick: () => void;
    }
    ```
- **`IconProps`**: A union type that combines **`NonClickableIconProps`** and **`ClickableBaseProps`**.
```typescript
    type IconProps = NonClickableIconProps | ClickableBaseProps;
```

## Props 
The **`Icon`** component accepts the following props:

| props        | Type          | Required / Optional      | Description      |
| -------------| ------------- | :---: |--------------------------------------- |
| Svg          | React.VFC<React.SVGProps<SVGSVGElement>>	 | Required          |A functional component representing the SVG to be rendered |
| className    | string  | Optional          |Additional custom class names to style the icon |
| width        | number  | Optional (default: 32)         |The width of the SVG icon |
| height       | number  | Optional (default: 32)         |The height of the SVG icon |
| clickable    | boolean  | Optional          |A flag to determine if the icon should be rendered as clickable |
| onClick      | () => void  | Required if **`clickable`** is **`true`**          |The click event handler function |
| otherProps   | React.SVGProps<SVGSVGElement> | Optional          |Any additional SVG properties excluding **`onClick`** |


## Functionality 
1. **`SVG Icon Rendering`**: SVG icon is constructed with the provided props, including width, height, and any additional props. The **`onClick`** attribute is explicitly set to **`undefined`** to ensure it doesn't interfere when the icon is non-clickable.

2. **`Clickable Icon`**: If the **`clickable`** prop is **`true`**, the icon is wrapped in a **`<button>`** element, styled appropriately, and the **`onClick`** handler is attached to the button.

3. **`Non-Clickable Icon`**: If the **`clickable`** prop is not provided or set to **`false`**, the SVG icon is returned as-is.

## Usage Examples
Here are simpler examples of using the **`Icon`** component in different ways without the additional logic of other components:

### Example 1: Basic Non-Clickable Icon
```jsx
import { Icon } from '@/shared/ui/deprecated/Icon';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';

const BasicNonClickableIcon = () => {
    return <Icon Svg={EyeIcon} />;
};

export default BasicNonClickableIcon;
```

### Example 2: Example 2: Basic Clickable Icon
```jsx
import { Icon } from '@/shared/ui/deprecated/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

const BasicClickableIcon = () => {
    const handleClick = () => {
        alert('Icon clicked!');
    };

    return <Icon Svg={ArrowIcon} clickable onClick={handleClick} />;
};

export default BasicClickableIcon;
```

### Example 3: Icon with Custom Styling
```jsx
import { Icon } from '@/shared/ui/deprecated/Icon';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';

const CustomStyledIcon = () => {
    return <Icon Svg={CalendarIcon} className="custom-icon-class" />;
};

export default CustomStyledIcon;
```

### Example 4: Icon with Custom Dimensions
```jsx
import { Icon } from '@/shared/ui/deprecated/Icon';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';

const CustomDimensionIcon = () => {
    return <Icon Svg={EyeIcon} width={40} height={40} />;
};

export default CustomDimensionIcon;
```

### Example 5: Clickable Icon with Additional SVG Props
```jsx
import { Icon } from '@/shared/ui/deprecated/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

const ClickableIconWithProps = () => {
    const handleClick = () => {
        console.log('Icon clicked!');
    };

    return <Icon Svg={ArrowIcon} clickable onClick={handleClick} fill="red" />;
};

export default ClickableIconWithProps;
```

# Conclusion
The **`Icon`** component is a flexible and reusable React component for rendering SVG icons, supporting both clickable and non-clickable variants. It accepts a range of props for customization, including the SVG itself, styling classes, dimensions, and click handling. This versatility allows for easy integration and functionality in various parts of an application. The component ensures proper handling of click events by conditionally wrapping the icon in a button when the **`clickable`** prop is true, maintaining a clean and consistent interface.

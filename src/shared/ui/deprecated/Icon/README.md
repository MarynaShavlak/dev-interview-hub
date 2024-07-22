# Icon (Deprecated)

Note: This component is deprecated. Please use the new component from the redesigned directory.

## Overview 
The **`Icon`** component is a versatile and reusable React component designed to render SVG icons. 


## Type Definition
The types used in the **`Icon`** component are defined as follows:
`IconProps`: An interface extending `React.SVGProps<SVGSVGElement>` with additional properties for the icon's configuration.
```typescript
interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}
```

## Props 
The **`Icon`** component accepts the following props:

| props        | Type          | Required / Optional      | Description      |
| -------------| ------------- | :---: |--------------------------------------- |
| Svg          | React.VFC<React.SVGProps<SVGSVGElement>>	 | Required          |A functional component representing the SVG to be rendered |
| className    | string  | Optional          |Additional custom class names to style the icon |
| inverted    | boolean  | Optional          |A flag to apply the inverted style to the icon |
| otherProps   | React.SVGProps<SVGSVGElement> | Optional          |Any additional SVG properties excluding **`onClick`** |


## Usage Examples
Here are simpler examples of using the **`Icon`** component in different ways without the additional logic of other components:

### Example 1: Basic Icon
```jsx
import { Icon } from '@/shared/ui/deprecated/Icon';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';

const BasicIcon = () => {
    return <Icon Svg={EyeIcon}className="custom-icon-class" />;
};

export default BasicNonClickableIcon;
```

### Example 2: Example 2: Icon with Inverted Colors
```jsx
import { Icon } from '@/shared/ui/deprecated/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

const InvertedIcon = () => {
       return <Icon Svg={ArrowIcon} inverted />;
};

export default InvertedIcon;
```


### Example 3: Icon with Custom Dimensions
```jsx
import { Icon } from '@/shared/ui/deprecated/Icon';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';

const CustomDimensionIcon = () => {
    return <Icon Svg={EyeIcon} width={40} height={40} fill="red" />;
};

export default CustomDimensionIcon;
```

# Conclusion
The `Icon` component is a flexible and reusable React component for rendering SVG icons, supporting various customizations through props such as `className`, `inverted`, and additional SVG properties. 
Its simplicity and versatility make it suitable for a wide range of applications, with easy integration and consistent styling.

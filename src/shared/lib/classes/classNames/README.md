# `classNames` Function for Working with Class Names

The `classNames` function constructs a string of CSS class names by combining a base class name with additional class names and conditional class names provided in an object.

## Purpose
The `classNames` function is particularly useful for dynamically constructing a string of CSS class names based on various conditions. 
This utility helps in managing conditional class logic in a clean and readable manner, especially in React components where dynamic class names are often required.

By using the `classNames function`, you can:

1. Concisely merge base class names with additional class names based on certain conditions.
2. Easily filter out any falsy values, ensuring that only valid class names are included in the final string.
3. 
This approach enhances code maintainability and readability by providing a structured way to handle conditional class names.


## Parameters:
- `cls`: A string representing the base class name.
- `mods`: An object of type `Mods` (`Record<string, boolean | string | undefined>`). 
          This object contains key-value pairs where the key is the class name and the value is a condition that determines whether the class name should be included.
- `additional`: An array of strings or undefined values representing additional class names to be included unconditionally.

## Returns:
- A string representing the combined class names, separated by spaces.

## Usage Example:
```typescript jsx
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

const mods: Mods = {
  [cls.square]: true,
  [cls.disabled]: false,
  [cls.max]: true,
  [cls.withAddon]: false,
};

const additionalClasses = ['extra-class', undefined, 'another-class'];

const buttonClassName = classNames(cls.Button, mods, additionalClasses);
// buttonClassName: 'Button extra-class another-class square max'
```


# useInput hook
A custom React hook designed to manage the state and behavior of an input field. It simplifies handling input changes, focus management, caret position,  and supports input validation based on given props.

## Parameters
- `autofocus:`_Optional_. A boolean flag indicating whether the input should automatically focus on mount.
- `digitsOnly`: _Optional_. A boolean flag to restrict input to digits only. If set to true, non-numeric input will be ignored.
- `onChange`: _Optional_.  A callback function that is invoked whenever the input value changes. Receives the current value as a parameter.

## Returns
An object with the following properties:
- `ref`: A React ref object that should be attached to the input element. Used to programmatically control the input's focus.
- `isFocused`: A boolean indicating whether the input is currently focused. Useful for applying styles or handling focus-based logic.
- `onChangeHandler`: A function to handle input changes. Validates the input based on `digitsOnly` and triggers the `onChange` callback.
- `onBlurHandler`: A function to handle when the input loses focus. It updates the isFocused state and triggers the onChange callback with trimmed text.
- `onFocus`: A function to handle when the input gains focus. Updates the `isFocused` state.
  `onSelect`: A function to handle when the user selects part of the input text. Updates the `caretPosition` state.
  `caretPosition`: Number representing the current caret position in the input field.


## Internal Behavior
1. **State Management**:
    - **`isFocused`**: Indicates if the input field is currently focused. Initially set to `false` and changes to `true` when the input is focused.

2. **Refs**:
    - **`ref`**: Holds a reference to the input element using the `useRef` hook. Used to programmatically control the input's focus.

3. Callbacks:
    - **`onChangeHandler`**: Handles input changes. If `digitsOnly` is `true`, it ignores non-numeric input. Calls the `onChange` callback with the input value.
    - **`onBlurHandler`**: Handles the input losing focus. Updates `isFocused` and triggers the `onChange` callback with trimmed text.
    - **`onFocus`**: Updates the `isFocused` state when the input gains focus.
    - **`onSelect`**: Updates the `caretPosition` state based on the user's selection in the input field.
4. Effects:
    - **`useEffect`** when `autofocus` changes. If `autofocus` is `true`, it sets `isFocused` to `true` and focuses the input element using the `ref`.

## Usage Example 
```typescript jsx
import React, { useState } from 'react';
import { useInput } from '@/shared/lib/hooks/useInput/useInput';

const TextInput = () => {
    const [value, setValue] = useState('');
    const { ref, isFocused, onChangeHandler, onBlurHandler, onFocus } = useInput({
        autofocus: true,
        digitsOnly: false,
        onChange: setValue,
    });

    return (
        <input
            ref={ref}
            value={value}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onFocus={onFocus}
            type="text"
            placeholder="Enter text"
        />
    );
};

export default TextInput;
```
## Conclusion
The `useInput` hook manages the state and behavior of an input field, including focus control, value handling, and optional input validation.
It simplifies managing input interactions by providing handlers for change, blur, and focus events, and it supports autofocus and digit-only constraints.
Additionally, it tracks the caret position, allowing you to display or manipulate the caret as needed for more advanced input scenarios.

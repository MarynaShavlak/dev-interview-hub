import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import { trimText } from '../../trimText/trimText';

/**
 * Custom hook for managing input field state, focus, and validation.
 * @param {boolean} [autofocus=false] - A boolean flag indicating whether the input should automatically focus on mount.
 * @param {boolean} [digitsOnly=false] - A boolean flag to restrict input to digits only. If set to true, non-numeric input will be ignored.
 * @param {(value: string) => void} [onChange] - Optional callback function that is invoked whenever the input value changes. Receives the current value as a parameter.
 *
 * @returns {{
 *    ref: React.RefObject<HTMLInputElement>;
 *    isFocused: boolean;
 *    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
 *    onBlurHandler: (e: FocusEvent<HTMLInputElement>) => void;
 *    onFocus: () => void;
 *  }} An object with the following properties:
 *  * `ref`: A React ref object that should be attached to the input element. Used to programmatically control the input's focus.
 *  * `isFocused`: Boolean indicating whether the input is currently focused. Useful for applying styles or handling focus-based logic.
 *  * `onChangeHandler`: Function to handle input changes. Validates the input based on `digitsOnly` and triggers the `onChange` callback.
 *  * `onBlurHandler`: Function to handle when the input loses focus. It updates the `isFocused` state and triggers the `onChange` callback with trimmed text.
 *  * `onFocus`: Function to handle when the input gains focus. Updates the `isFocused` state.
 */

interface UseInputProps {
    autofocus?: boolean;
    digitsOnly?: boolean;
    onChange?: (value: string) => void;
}

export function useInput({ autofocus, digitsOnly, onChange }: UseInputProps) {
    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (digitsOnly && !/^\d*$/.test(e.target.value)) {
            return;
        }
        onChange?.(e.target.value);
    };

    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onChange?.(trimText(e.target.value));
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    return {
        ref,
        isFocused,
        onChangeHandler,
        onBlurHandler,
        onFocus,
    };
}

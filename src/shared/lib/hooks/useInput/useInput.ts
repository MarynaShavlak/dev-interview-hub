import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import { trimText } from '../../text/trimText/trimText';
import { InputValidations } from '@/shared/ui/redesigned/Input';

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
 *    caretPosition: number;
 *    onSelect: (e: any) => void;
 *  }} An object with the following properties:
 *  * `ref`: A React ref object that should be attached to the input element. Used to programmatically control the input's focus.
 *  * `isFocused`: Boolean indicating whether the input is currently focused. Useful for applying styles or handling focus-based logic.
 *  * `onChangeHandler`: Function to handle input changes. Validates the input based on `digitsOnly` and triggers the `onChange` callback.
 *  * `onBlurHandler`: Function to handle when the input loses focus. It updates the `isFocused` state and triggers the `onChange` callback with trimmed text.
 *  * `onFocus`: Function to handle when the input gains focus. Updates the `isFocused` state.
 *  * `onSelect`: Function to handle when the user selects part of the input text. Updates the `caretPosition` state.
 *  * `caretPosition`: Number representing the current caret position in the input field.
 */

interface UseInputProps {
    autofocus?: boolean;
    digitsOnly?: boolean;
    onChange?: (value: string) => void;
    onBlur?: () => void;
}

export const useValidation = (
    value: string | number | undefined,
    validations: InputValidations = {},
) => {
    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);

    useEffect(() => {
        Object.entries(validations).forEach(([validation, rule]) => {
            switch (validation) {
                case 'minLength':
                    if (typeof value === 'string' && value.length < rule) {
                        setMinLengthError(true);
                    } else {
                        setMinLengthError(false);
                    }
                    break;
                case 'isEmpty':
                    if (value) {
                        setEmpty(false);
                    } else {
                        setEmpty(true);
                    }
                    break;
                default:
                    console.warn(`Unknown validation: ${validation}`);
                    break;
            }
        });
    }, [validations, value]);

    return { isEmpty, minLengthError };
};

export const useInput = ({
    autofocus,
    digitsOnly,
    onChange,
    onBlur,
}: UseInputProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);
    const [isDirty, setIsDirty] = useState(false);

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
        setCaretPosition(e.target.value.length);
    };

    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        const trimmedValue = trimText(e.target.value);
        onChange?.(trimmedValue);
        setIsFocused(false);
        setIsDirty(true);
        onBlur?.();
    };

    const onFocus = () => {
        setIsFocused(true);
    };
    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0);
    };

    return {
        ref,
        isFocused,
        isDirty,
        onChangeHandler,
        onBlurHandler,
        onFocus,
        onSelect,
        caretPosition,
    };
};

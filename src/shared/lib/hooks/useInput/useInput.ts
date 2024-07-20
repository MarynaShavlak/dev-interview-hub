import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import { trimText } from '../../trimText/trimText';

interface UseInputProps {
    autofocus?: boolean;
    readonly?: boolean;
    digitsOnly?: boolean;
    onChange?: (value: string) => void;
    value?: string | number;
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

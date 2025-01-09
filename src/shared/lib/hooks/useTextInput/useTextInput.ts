import { useCallback, useState } from 'react';
import { useInputValidationConfig } from '../validationHooks/useInputValidationConfig/useInputValidationConfig';

export const useTextInput = (initialValue: string = '') => {
    const [value, setValue] = useState(initialValue);
    const validConfig = useInputValidationConfig();

    const handleChange = useCallback((newValue: string) => {
        setValue(newValue);
    }, []);

    return {
        value,
        handleChange,
        validConfig,
    };
};

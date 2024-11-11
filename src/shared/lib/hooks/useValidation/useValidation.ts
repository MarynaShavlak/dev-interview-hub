import { useEffect, useState } from 'react';

export interface ValidationErrors {
    isEmpty: boolean;
    minLengthError: boolean;
    maxLengthError: boolean;
    emailError: boolean;
}

export interface InputValidations {
    isEmpty?: boolean;
    minLength?: number;
    maxLength?: number;
    isEmail?: boolean;
}

export const useValidation = (
    value: string | number = '',
    validations: InputValidations = {},
) => {
    const [errors, setErrors] = useState<ValidationErrors>({
        isEmpty: true,
        minLengthError: false,
        maxLengthError: false,
        emailError: false,
    });

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const newErrors: ValidationErrors = { ...errors }; // Copy the current state

        newErrors.isEmpty = false;
        newErrors.minLengthError = false;
        newErrors.maxLengthError = false;
        newErrors.emailError = false;

        Object.entries(validations).forEach(([validation, rule]) => {
            switch (validation) {
                case 'minLength':
                    if (
                        typeof value === 'string' &&
                        value.length < (rule as number)
                    ) {
                        newErrors.minLengthError = true;
                    }
                    break;
                case 'isEmpty':
                    newErrors.isEmpty = !value;
                    break;
                case 'maxLength':
                    if (
                        typeof value === 'string' &&
                        value.length > (rule as number)
                    ) {
                        newErrors.maxLengthError = true;
                    }
                    break;
                case 'isEmail': {
                    const emailRegex =
                        // eslint-disable-next-line max-len
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (
                        typeof value === 'string' &&
                        !emailRegex.test(value.toLowerCase())
                    ) {
                        newErrors.emailError = true;
                    }
                    break;
                }
                default:
                    console.warn(`Unknown validation: ${validation}`);
                    break;
            }
        });

        setErrors(newErrors);
        setIsValid(!Object.values(newErrors).some((error) => error));
    }, [value, validations]);

    return errors;
};

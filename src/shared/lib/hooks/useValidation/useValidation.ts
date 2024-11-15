import { useEffect, useState } from 'react';

export interface ValidationErrors {
    isEmpty: boolean;
    minLengthError: boolean;
    maxLengthError: boolean;
    emailError: boolean;
    usernameError: boolean;
}

export interface InputValidations {
    isEmpty?: boolean;
    minLength?: number;
    maxLength?: number;
    isEmail?: boolean;
    isUsername?: boolean;
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
        usernameError: false,
    });

    // const [isValid, setIsValid] = useState(false);

    // useEffect(() => {
    //     const newErrors: ValidationErrors = { ...errors }; // Copy the current state
    //
    //     newErrors.isEmpty = false;
    //     newErrors.minLengthError = false;
    //     newErrors.maxLengthError = false;
    //     newErrors.emailError = false;
    //     newErrors.usernameError = false;
    //
    //     Object.entries(validations).forEach(([validation, rule]) => {
    //         switch (validation) {
    //             case 'minLength':
    //                 if (
    //                     typeof value === 'string' &&
    //                     value.length < (rule as number)
    //                 ) {
    //                     newErrors.minLengthError = true;
    //                 }
    //                 break;
    //             case 'isEmpty':
    //                 newErrors.isEmpty = !value;
    //                 break;
    //             case 'maxLength':
    //                 if (
    //                     typeof value === 'string' &&
    //                     value.length > (rule as number)
    //                 ) {
    //                     newErrors.maxLengthError = true;
    //                 }
    //                 break;
    //             case 'isEmail': {
    //                 const emailRegex =
    //                     // eslint-disable-next-line max-len
    //                     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //                 if (
    //                     typeof value === 'string' &&
    //                     !emailRegex.test(value.toLowerCase())
    //                 ) {
    //                     newErrors.emailError = true;
    //                 }
    //                 break;
    //             }
    //             case 'isUsername': {
    //                 const usernameRegex =
    //                     /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    //                 if (
    //                     typeof value === 'string' &&
    //                     !usernameRegex.test(value)
    //                 ) {
    //                     newErrors.usernameError = true;
    //                 }
    //                 break;
    //             }
    //             default:
    //                 console.warn(`Unknown validation: ${validation}`);
    //                 break;
    //         }
    //     });
    //
    //     setErrors(newErrors);
    //     // setIsValid(!Object.values(newErrors).some((error) => error));
    // }, [value, validations]);

    useEffect(() => {
        const newErrors: ValidationErrors = {
            isEmpty: false,
            minLengthError: false,
            maxLengthError: false,
            emailError: false,
            usernameError: false,
        };

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
                case 'isUsername': {
                    const usernameRegex =
                        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
                    if (
                        typeof value === 'string' &&
                        !usernameRegex.test(value)
                    ) {
                        newErrors.usernameError = true;
                    }
                    break;
                }
                default:
                    console.warn(`Unknown validation: ${validation}`);
                    break;
            }
        });

        // Check if the new errors are different from the current state
        if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
            setErrors(newErrors);
        }
    }, [value, validations, errors]);

    return errors;
};

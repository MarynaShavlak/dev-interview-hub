import { useEffect, useState } from 'react';
import { z } from 'zod';

export interface ValidationErrors {
    isEmpty: boolean;
    minLengthError: boolean;
    maxLengthError: boolean;
    emailError: boolean;
    usernameError: boolean;
    isUrlError: boolean;
}

export interface InputValidations {
    isEmpty?: boolean;
    minLength?: number;
    maxLength?: number;
    isEmail?: boolean;
    isUsername?: boolean;
    isUrl?: boolean;
}
type Validation = keyof InputValidations;
const urlSchema = z.string().url();

export const useInputErrors = (
    value: string | number = '',
    validations: InputValidations = {},
): ValidationErrors => {
    const [errors, setErrors] = useState<ValidationErrors>({
        isEmpty: true,
        minLengthError: false,
        maxLengthError: false,
        emailError: false,
        usernameError: false,
        isUrlError: false,
    });

    useEffect(() => {
        const newErrors: ValidationErrors = {
            isEmpty: false,
            minLengthError: false,
            maxLengthError: false,
            emailError: false,
            usernameError: false,
            isUrlError: false,
        };

        (
            Object.entries(validations) as [
                Validation,
                InputValidations[Validation],
            ][]
        ).forEach(([validation, rule]) => {
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
                        /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._@]+(?<![_.])$/;
                    if (
                        typeof value === 'string' &&
                        !usernameRegex.test(value)
                    ) {
                        newErrors.usernameError = true;
                    }
                    break;
                }
                case 'isUrl': {
                    if (typeof value === 'string') {
                        const stringToCheck = value.trim();
                        if (stringToCheck !== '') {
                            const result = urlSchema.safeParse(stringToCheck);
                            newErrors.isUrlError = !result.success;
                        }
                    }
                    break;
                }
                default: {
                    const exhaustiveCheck: never = validation;
                    throw new Error(
                        `Unhandled validation case: ${exhaustiveCheck}`,
                    );
                }
            }
        });

        // Check if the new errors are different from the current state
        if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
            setErrors(newErrors);
        }
    }, [value, validations, errors]);

    return errors;
};

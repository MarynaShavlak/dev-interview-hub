import { InputValidations } from '../useInputErrors/useInputErrors';

export type InputErrorValidation = Record<string, InputValidations>;

export const useInputValidationConfig = (): InputErrorValidation => {
    return {
        email: {
            isEmpty: true,
            isEmail: true,
        },
        username: {
            isEmpty: true,
            isUsername: true,
        },
        firstname: {
            isEmpty: true,
            minLength: 2,
        },
        lastname: {
            isEmpty: true,
            minLength: 2,
        },
        password: {
            isEmpty: true,
            minLength: 3,
            maxLength: 8,
        },
        title: {
            isEmpty: true,
            minLength: 2,
            maxLength: 10,
        },
        subtitleText: {
            isEmpty: true,
            minLength: 2,
            maxLength: 8,
        },
        subtitleLink: {
            isUrl: true,
        },
        blockTitle: {
            maxLength: 8,
        },
    };
};

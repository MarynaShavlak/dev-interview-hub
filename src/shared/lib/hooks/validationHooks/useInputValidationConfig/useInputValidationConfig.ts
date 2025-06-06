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
            maxLength: 30,
        },
        lastname: {
            isEmpty: true,
            minLength: 2,
            maxLength: 30,
        },
        password: {
            isEmpty: true,
            minLength: 3,
            maxLength: 20,
        },
        title: {
            isEmpty: true,
            minLength: 2,
            maxLength: 150,
            // minLength: 2,
            // maxLength: 8,
        },
        subtitleText: {
            // isEmpty: true,
            // minLength: 2,
            maxLength: 150,
            // minLength: 2,
            // maxLength: 70,
        },
        subtitleLink: {
            isUrl: true,
        },
        blockTitle: {
            maxLength: 100,
        },
        blockTitleRequired: {
            isEmpty: true,
            maxLength: 100,
        },
    };
};

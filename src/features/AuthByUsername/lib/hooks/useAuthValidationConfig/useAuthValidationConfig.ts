import { InputValidations } from '@/shared/lib/hooks/useValidation/useValidation';

export type AuthValidation = Record<string, InputValidations>;

export const useAuthValidationConfig = (): AuthValidation => {
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
    };
};

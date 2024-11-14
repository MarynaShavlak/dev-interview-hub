import {
    InputValidations,
    useValidation,
} from '@/shared/lib/hooks/useValidation/useValidation';

export const useAuthValidationConfig = () => {
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

export const useAuthFormValidations = (
    data: Record<string, string>,
    validConfig: Record<string, InputValidations>,
) => {
    const emailErrors = useValidation(data.email, validConfig.email);
    const passwordErrors = useValidation(data.password, validConfig.password);
    const usernameErrors = useValidation(data.username, validConfig.username);
    const firstnameErrors = useValidation(
        data.firstname,
        validConfig.firstname,
    );
    const lastnameErrors = useValidation(data.lastname, validConfig.lastname);

    const hasErrors = [
        emailErrors,
        passwordErrors,
        usernameErrors,
        firstnameErrors,
        lastnameErrors,
    ].some((validation) => Object.values(validation).some((error) => error));

    return {
        hasErrors,
        emailErrors,
        passwordErrors,
        usernameErrors,
        firstnameErrors,
        lastnameErrors,
    };
};

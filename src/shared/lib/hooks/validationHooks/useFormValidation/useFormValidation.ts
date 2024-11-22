import { useInputErrors } from '../useInputErrors/useInputErrors';
import { AuthValidation } from '../useInputValidationConfig/useInputValidationConfig';

export const useFormValidation = (
    data: Record<string, string>,
    validConfig: AuthValidation,
    mode: 'signIn' | 'signUp' | 'resetPassword' | 'profile',
) => {
    const emailErrors = useInputErrors(data.email, validConfig.email);
    const passwordErrors = useInputErrors(data.password, validConfig.password);
    const usernameErrors = useInputErrors(data.username, validConfig.username);
    const firstnameErrors = useInputErrors(
        data.firstname,
        validConfig.firstname,
    );
    const lastnameErrors = useInputErrors(data.lastname, validConfig.lastname);

    let relevantErrors;

    switch (mode) {
        case 'signIn':
            relevantErrors = [emailErrors, passwordErrors];
            break;
        case 'resetPassword':
            relevantErrors = [emailErrors];
            break;
        case 'profile':
            relevantErrors = [usernameErrors, firstnameErrors, lastnameErrors];
            break;
        default:
            relevantErrors = [
                emailErrors,
                passwordErrors,
                usernameErrors,
                firstnameErrors,
                lastnameErrors,
            ];
            break;
    }

    const hasErrors = relevantErrors.some((validation) =>
        Object.values(validation).some((error) => error),
    );
    return {
        hasErrors,
        emailErrors,
        passwordErrors,
        usernameErrors,
        firstnameErrors,
        lastnameErrors,
    };
};

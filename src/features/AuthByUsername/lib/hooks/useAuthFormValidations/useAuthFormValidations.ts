import { useValidation } from '@/shared/lib/hooks/useValidation/useValidation';
import { AuthValidation } from '../useAuthValidationConfig/useAuthValidationConfig';

export const useAuthFormValidations = (
    data: Record<string, string>,
    validConfig: AuthValidation,
    mode: 'signIn' | 'signUp' | 'resetPassword',
) => {
    const emailErrors = useValidation(data.email, validConfig.email);
    const passwordErrors = useValidation(data.password, validConfig.password);
    const usernameErrors = useValidation(data.username, validConfig.username);
    const firstnameErrors = useValidation(
        data.firstname,
        validConfig.firstname,
    );
    const lastnameErrors = useValidation(data.lastname, validConfig.lastname);

    let relevantErrors;

    switch (mode) {
        case 'signIn':
            relevantErrors = [emailErrors, passwordErrors];
            break;
        case 'resetPassword':
            relevantErrors = [emailErrors];
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

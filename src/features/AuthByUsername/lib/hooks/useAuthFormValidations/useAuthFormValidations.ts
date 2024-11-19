import {
    InputValidations,
    useValidation,
} from '@/shared/lib/hooks/useValidation/useValidation';

export const useAuthFormValidations = (
    data: Record<string, string>,
    validConfig: Record<string, InputValidations>,
    mode: 'signIn' | 'signUp',
) => {
    const emailErrors = useValidation(data.email, validConfig.email);
    const passwordErrors = useValidation(data.password, validConfig.password);
    const usernameErrors = useValidation(data.username, validConfig.username);
    const firstnameErrors = useValidation(
        data.firstname,
        validConfig.firstname,
    );
    const lastnameErrors = useValidation(data.lastname, validConfig.lastname);

    const relevantErrors =
        mode === 'signIn'
            ? [emailErrors, passwordErrors]
            : [
                  emailErrors,
                  passwordErrors,
                  usernameErrors,
                  firstnameErrors,
                  lastnameErrors,
              ];

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

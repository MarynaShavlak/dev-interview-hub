import { useInputErrors } from '../useInputErrors/useInputErrors';
import { InputErrorValidation } from '../useInputValidationConfig/useInputValidationConfig';

export const useFormValidation = (
    data: Record<string, string>,
    validConfig: InputErrorValidation,
    mode: 'signIn' | 'signUp' | 'resetPassword' | 'profile' | 'article',
) => {
    const emailErrors = useInputErrors(data.email, validConfig.email);
    const passwordErrors = useInputErrors(data.password, validConfig.password);
    const usernameErrors = useInputErrors(data.username, validConfig.username);
    const firstnameErrors = useInputErrors(
        data.firstname,
        validConfig.firstname,
    );
    const lastnameErrors = useInputErrors(data.lastname, validConfig.lastname);
    const titleErrors = useInputErrors(data.title, validConfig.title);
    const subtitleTextErrors = useInputErrors(
        data.subtitleText,
        validConfig.subtitleText,
    );
    const subtitleLinkErrors = useInputErrors(
        data.subtitleLink,
        validConfig.subtitleLink,
    );
    const blockTitleErrors = useInputErrors(
        data.blockTitle,
        validConfig.blockTitle,
    );
    const blockTitleRequiredErrors = useInputErrors(
        data.blockTitle,
        validConfig.blockTitleRequired,
    );

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
        case 'article':
            relevantErrors = [
                titleErrors,
                subtitleTextErrors,
                subtitleLinkErrors,
                // blockTitleErrors,
                // blockTitleRequiredErrors,
            ];
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
        titleErrors,
        subtitleTextErrors,
        subtitleLinkErrors,
        blockTitleErrors,
        blockTitleRequiredErrors,
    };
};

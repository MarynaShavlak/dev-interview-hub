import {
    useInputErrors,
    ValidationErrors,
} from '../useInputErrors/useInputErrors';
import { InputErrorValidation } from '../useInputValidationConfig/useInputValidationConfig';

export interface UseFormValidationReturnType {
    hasInputErrors: boolean;
    emailErrors: ValidationErrors;
    passwordErrors: ValidationErrors;
    usernameErrors: ValidationErrors;
    firstnameErrors: ValidationErrors;
    lastnameErrors: ValidationErrors;
    titleErrors: ValidationErrors;
    subtitleTextErrors: ValidationErrors;
    subtitleLinkErrors: ValidationErrors;
    blockTitleErrors: ValidationErrors;
    blockTitleRequiredErrors: ValidationErrors;
}
export const useFormValidation = (
    data: Record<string, string>,
    validConfig: InputErrorValidation,
    mode: 'signIn' | 'signUp' | 'resetPassword' | 'profile' | 'article',
): UseFormValidationReturnType => {
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
        case 'signUp':
            relevantErrors = [
                emailErrors,
                passwordErrors,
                usernameErrors,
                firstnameErrors,
                lastnameErrors,
            ];
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
            ];
            break;
        default: {
            const exhaustiveCheck: never = mode;
            throw new Error(`Unhandled mode case: ${exhaustiveCheck}`);
        }
    }

    const hasInputErrors = relevantErrors.some((validation) =>
        Object.values(validation).some((error) => error),
    );

    return {
        hasInputErrors,
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

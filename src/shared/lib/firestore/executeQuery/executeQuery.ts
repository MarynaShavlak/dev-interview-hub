import { handleRequestErrorMessage } from '../handleRequestErrorMessage/handleRequestErrorMessage';

export const executeQuery = async <T>(
    operation: () => Promise<T>,
    errorMessage: string,
    additionalErrorData?: any,
) => {
    try {
        const data = await operation();
        return { data };
    } catch (error) {
        return handleRequestErrorMessage(
            errorMessage,
            additionalErrorData || error,
        );
    }
};

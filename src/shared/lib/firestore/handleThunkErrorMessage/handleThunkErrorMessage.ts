export const handleThunkErrorMessage = (
    error: unknown,
    message: string,
): string => {
    console.error(message, error);
    return message;
};

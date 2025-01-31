export const handleThunkError = (error: unknown, message: string): string => {
    console.error(message, error);
    return message;
};

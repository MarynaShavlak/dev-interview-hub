export const handleRequestErrorMessage = (message: string, error?: unknown) => {
    console.error(message, error);
    return { error: error || null };
};

export function assertExists(
    value: unknown,
    errorMessage: string,
): asserts value {
    if (value === null || value === undefined) {
        throw new Error(errorMessage);
    }
}

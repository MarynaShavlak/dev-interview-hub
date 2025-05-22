export function assertNotNull<T>(
    value: T | null | undefined,
    errorMessage: string,
): asserts value is T {
    if (value === null || value === undefined) {
        throw new Error(errorMessage);
    }
}

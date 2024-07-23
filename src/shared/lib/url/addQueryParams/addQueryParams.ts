export function getQueryParams(params: OptionalRecord<string, string>): string {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([name, value]) => {
        if (value !== undefined) {
            searchParams.set(name, value);
        }
    });
    return `?${searchParams.toString()}`;
}

/**
 * Adds or updates query parameters in the browser's URL.
 * @param params - An object containing key-value pairs representing query parameters and their values.
 */
export function addQueryParams(params: OptionalRecord<string, string>) {
    window.history.pushState(null, '', getQueryParams(params));
}

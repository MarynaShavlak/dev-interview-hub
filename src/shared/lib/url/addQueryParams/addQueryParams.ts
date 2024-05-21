export function getQueryParams(params: OptionalRecord<string, string>) {

    const searchParams = new URLSearchParams(window.location.search);
    console.log('my params ', params);
    console.log('from url params ', searchParams);
    Object.entries(params).forEach(([name, value]) => {
        if (value !== undefined) {
            searchParams.set(name, value);
        }
    });
    return `?${searchParams.toString()}`;
}

/**
 * Функція додавання параметрів рядку запиту в URL
 * @param params
 */
export function addQueryParams(params: OptionalRecord<string, string>) {
    window.history.pushState(null, '', getQueryParams(params));
}

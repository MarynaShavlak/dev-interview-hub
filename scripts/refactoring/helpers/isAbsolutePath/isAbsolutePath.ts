/**
 * Checks if a given string is an absolute path based on predefined layers.
 *
 * An absolute path is considered valid if it starts with one of the predefined layers:
 * 'app', 'shared', 'entities', 'features', 'widgets', or 'pages'.
 *
 * @param {string} value - The string to be checked.
 * @returns {boolean} - Returns `true` if the string starts with any of the predefined layers, otherwise `false`.
 *
 * @example
 * // Example usage:
 * isAbsolutePath('app/home'); // Returns: true
 * isAbsolutePath('utils/helper'); // Returns: false
 */

export const isAbsolutePath = (value: string) => {
    const layers = [
        'app',
        'shared',
        'entities',
        'features',
        'widgets',
        'pages',
    ];
    return layers.some((layer) => value.startsWith(layer));
};

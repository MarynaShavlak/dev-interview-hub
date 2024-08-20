export type Mods = Record<string, boolean | string | undefined>;

/**
 * The `classNames` function generates a string of CSS class names based on the provided arguments.
 * It is useful for conditionally applying CSS classes to elements based on boolean flags and dynamic modifications.
 *
 * @param cls - The base CSS class that is always included in the resulting string.
 * @param mods - An object where keys represent CSS class names and values are boolean flags, strings, or undefined.
 *               If the value is truthy, the corresponding key (CSS class name) is included in the result.
 * @param additional - An array of additional CSS class names or undefined values.
 *                     Only non-undefined values are included in the resulting string.
 *
 * @returns A string of concatenated CSS class names derived from `cls`, `mods`, and `additional`.
 */

export const classNames = (
    cls: string,
    mods: Mods = {},
    additional: Array<string | undefined> = [],
): string => {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            .map(([className]) => className),
    ].join(' ');
};

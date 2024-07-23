/**
 * The `trimText` function removes leading and trailing whitespace from a given string.
 * If the input string is `undefined` or `null`, the function returns an empty string.
 * This is useful for ensuring that text input is cleaned of extra spaces before processing or displaying it.
 *
 * @param value - Optional. A string that you want to trim. If `value` is `undefined` or `null`, it will be treated as an empty string.
 * @returns A string with leading and trailing whitespace removed. If the input is `undefined` or `null`, an empty string is returned.
 *
 * */

export const trimText = (value?: string) => {
    return value ? value.trim() : '';
};

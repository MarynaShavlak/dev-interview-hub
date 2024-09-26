/**
 * Splits a camelCase or PascalCase string into a space-separated string.
 * For example, 'ArticleRating' becomes 'Article Rating'.
 *
 * @param key - The string to split.
 * @returns The string with spaces inserted before uppercase letters.
 */
export const splitCamelCase = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').trim();
};

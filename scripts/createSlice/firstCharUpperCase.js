/**
 * Capitalizes the first letter of a given string.
 *
 * This function takes a string and returns a new string with the first character converted to uppercase.
 *
 * @param {string} str - The input string to be capitalized.
 * @return {string} A new string with the first letter in uppercase, and the rest of the string unchanged.
 *
 * @example
 * // returns 'Button'
 * module.exports('button');
 *
 */
module.exports = (str) => str[0].toUpperCase() + str.slice(1);

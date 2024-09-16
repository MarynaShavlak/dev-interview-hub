/**
 * Generates a TypeScript interface declaration.
 *
 * This function uses the provided `sliceName` to create an interface name where the first character is capitalized
 * and returns a string representing the TypeScript interface declaration.
 *
 * @param {string} sliceName - The name of the slice to be used in the interface declaration. The first letter of the resulting interface name will be capitalized.
 * @return {string} The TypeScript interface declaration string with the capitalized interface name.
 *
 * @example
 * // returns 'export interface UserSchema {}'
 * module.exports('user');
 *
 */
const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = (
    sliceName,
) => `export interface ${firstCharUpperCase(sliceName)}Schema {
    
}`;

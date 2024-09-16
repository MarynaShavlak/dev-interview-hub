/**
 * Generates a CSS class name string for a given component.
 *
 * @param {string} componentName - The name of the component to be used as part of the CSS class.
 * @return {string} The CSS class name string in the format `.<componentName>`.
 *
 * @example
 * // returns '.Button'
 * module.exports('Button');
 */

module.exports = (componentName) => `.${componentName} {

}`;

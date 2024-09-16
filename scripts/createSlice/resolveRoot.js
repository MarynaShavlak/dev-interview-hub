const path = require('path');

/**
 * Resolves a path relative to the root of the project directory.
 *
 * This function constructs an absolute path by resolving the given segments
 * relative to the root directory of the project, which is two levels up from
 * the current directory.
 *
 * @param {...string} segments - Path segments to be appended to the root directory. Each segment is treated as a part of the path.
 * @return {string} The resolved absolute path.
 *
 * @example
 * // If the current directory is '/project/src/utils',
 * // this will resolve to '/project/src/utils/../..', and append 'components/Button/index.js'
 * module.exports('components', 'Button', 'index.js');
 *
 */

module.exports = (...segments) =>
    path.resolve(__dirname, '..', '..', ...segments);

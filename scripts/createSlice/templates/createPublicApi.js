const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const firstCharUpperCase = require('../firstCharUpperCase');

/**
 * Creates an index file that serves as the public API for a given slice.
 *
 * This function generates an `index.ts` file for a specific slice, exporting both the component and the schema from
 * their respective locations within the slice directory. The component and schema are named based on the provided `sliceName`,
 * with the component's name capitalized.
 *
 * @param {string} layer - The layer in which the slice resides (e.g., 'features', 'widgets').
 * @param {string} sliceName - The name of the slice used to generate the filenames and export statements. The first character of the component name will be capitalized.
 * @return {Promise<void>} A promise that resolves when the `index.ts` file has been successfully created.
 *
 * @example
 * // Creates an index file for the 'userProfile' slice in the 'features' layer
 * await module.exports('features', 'userProfile');
 *
 */
module.exports = async (layer, sliceName) => {
    const componentName = firstCharUpperCase(sliceName);
    const schemaName = `${sliceName}Schema`;

    try {
        await fs.writeFile(
            resolveRoot('src', layer, sliceName, 'index.ts'),
            `export { ${componentName} } from './ui/${componentName}/${componentName}';
export { ${firstCharUpperCase(schemaName)} } from './model/types/${schemaName}';`,
        );
    } catch (e) {
        console.log('Failed to create PUBLIC API');
    }
};

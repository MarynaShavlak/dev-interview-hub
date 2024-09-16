const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const reduxSliceTemplate = require('./reduxSliceTemplate');
const schemaTypeTemplate = require('./schemaTypeTemplate');

/**
 * Creates a directory structure and necessary files for a Redux slice in a specified layer and slice name.
 *
 * This function sets up the following for a new Redux slice:
 * - A directory structure under `src/{layer}/{sliceName}/model` with subdirectories for `types`, `slices`, `selectors`, and `services`.
 * - A TypeScript file for the Redux slice (`.ts`) and a schema type file (`.ts`) within the appropriate subdirectories.
 *
 * @param {string} layer - The layer in which to create the Redux slice (e.g., 'features', 'widgets').
 * @param {string} sliceName - The name of the slice to be used for the Redux slice and schema type. This name will be used to generate the filenames.
 * @return {Promise<void>} A promise that resolves when the directory structure and files have been created.
 *
 * @example
 * // Creates a directory structure and files for the 'userProfile' slice in the 'features' layer
 * await module.exports('features', 'userProfile');
 *
 */

module.exports = async (layer, sliceName) => {
    const resolveModelPath = (...segments) =>
        resolveRoot('src', layer, sliceName, 'model', ...segments);

    const createModelStructure = async () => {
        try {
            await fs.mkdir(resolveModelPath());
            await fs.mkdir(resolveModelPath('types'));
            await fs.mkdir(resolveModelPath('slices'));
            await fs.mkdir(resolveModelPath('selectors'));
            await fs.mkdir(resolveModelPath('services'));
        } catch (e) {
            console.log(
                `Failed to create model segment for slice ${sliceName}`,
                e,
            );
        }
    };

    const createReduxSlice = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('slices', `${sliceName}Slice.ts`),
                reduxSliceTemplate(sliceName),
            );
        } catch (e) {
            console.log('Failed to create redux slice', e);
        }
    };

    const createSchemaType = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('types', `${sliceName}Schema.ts`),
                schemaTypeTemplate(sliceName),
            );
        } catch (e) {
            console.log('Failed to create the type of state schema', e);
        }
    };

    await createModelStructure();
    await createReduxSlice();
    await createSchemaType();
};

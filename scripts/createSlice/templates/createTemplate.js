const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const createModel = require('./createModel');
const createUI = require('./createUI');
const createPublicApi = require('./createPublicApi');

/**
 * Initializes a new slice by creating the necessary directory structure and files.
 *
 * This function sets up a new slice in the specified layer by performing the following actions:
 * 1. Creates a top-level directory for the slice.
 * 2. Calls `createModel` to set up the model-related files and directories.
 * 3. Calls `createUI` to set up the UI components and styles.
 * 4. Calls `createPublicApi` to create the public API for the slice.
 *
 * @param {string} layer - The layer where the slice will be created (e.g., 'features', 'widgets').
 * @param {string} sliceName - The name of the slice to be created. This name will be used to generate directories and files.
 * @return {Promise<void>} A promise that resolves when all setup tasks for the slice have been completed.
 *
 * @example
 * // Initializes a new slice 'userProfile' in the 'features' layer
 * await module.exports('features', 'userProfile');
 *
 */
module.exports = async (layer, sliceName) => {
    try {
        await fs.mkdir(resolveRoot('src', layer, sliceName));
    } catch (e) {
        console.log(`Failed to create directory for slice ${sliceName}`);
    }

    await createModel(layer, sliceName);
    await createUI(layer, sliceName);
    await createPublicApi(layer, sliceName);
};

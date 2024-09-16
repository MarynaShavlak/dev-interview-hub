const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const firstCharUpperCase = require('../firstCharUpperCase');
const componentTemplate = require('./componentTemplate');
const storyTemplate = require('./storyTemplate');
const styleTemplate = require('./styleTemplate');

/**
 * Creates a new UI component directory and its associated files.
 *
 * This function creates a directory structure and files for a new UI component in a specified layer and slice name.
 * It sets up the following:
 * - A directory for the component
 * - A TypeScript component file (`.tsx`)
 * - A Storybook story file (`.stories.tsx`)
 * - A SCSS module file (`.module.scss`)
 *
 * @param {string} layer - The layer in which to create the component (e.g., 'features', 'widgets').
 * @param {string} sliceName - The name of the slice to be used for the component. This name will be capitalized and used in the filenames and directory structure.
 * @return {Promise<void>} A promise that resolves when the UI directory and component files have been created.
 *
 * @example
 * // Creates a component 'UserProfile' in the 'features' layer
 * await module.exports('features', 'userProfile');
 */

module.exports = async (layer, sliceName) => {
    const resolveUIPath = (...segments) =>
        resolveRoot('src', layer, sliceName, 'ui', ...segments);

    const createUIDir = async () => {
        try {
            await fs.mkdir(resolveUIPath());
        } catch (e) {
            console.log('Failed to create UI directory');
        }
    };

    const createComponent = async () => {
        try {
            const componentName = firstCharUpperCase(sliceName);
            await fs.mkdir(resolveUIPath(componentName));
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.tsx`),
                componentTemplate(componentName),
            );
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.stories.tsx`),
                storyTemplate(layer, componentName),
            );
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.module.scss`),
                styleTemplate(componentName),
            );
        } catch (e) {
            console.log('Failed to create component');
        }
    };

    await createUIDir();
    await createComponent();
};

import { JsxAttribute } from 'ts-morph';

/**
 * Retrieves a JSX attribute node by its name from an array of JSX attributes.
 *
 * @param {JsxAttribute[]} jsxAttributes - An array of JSX attribute nodes to search through.
 * @param {string} name - The name of the attribute to find.
 * @returns {JsxAttribute | undefined} - The JSX attribute node with the specified name if found; otherwise, `undefined`.
 */

export const getAttributeNodeByName = (
    jsxAttributes: JsxAttribute[],
    name: string,
) => {
    return jsxAttributes.find((node) => node.getName() === name);
};

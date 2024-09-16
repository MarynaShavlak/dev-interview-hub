import { JsxAttribute, SyntaxKind } from 'ts-morph';

/**
 * Extracts and processes the component name from a JSX attribute.
 *
 * This function retrieves the text of the JSX expression from a given attribute.
 * If the text starts with a parenthesis `(`, it slices off the surrounding parentheses
 * and returns the remaining text. Otherwise, it returns the text as is.
 *
 * @param {JsxAttribute} [attribute] - An optional JSX attribute from which to extract the component name.
 * @returns {string | undefined} - The processed component name if it exists; otherwise, `undefined`.
 */

export const getReplacedComponent = (attribute?: JsxAttribute) => {
    const value = attribute
        ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
        ?.getExpression()
        ?.getText();

    if (value?.startsWith('(')) {
        return value.slice(1, -1);
    }

    return value;
};

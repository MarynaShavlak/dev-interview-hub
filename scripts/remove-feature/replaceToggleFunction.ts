import { Node, SyntaxKind } from 'ts-morph';
import { removedFeatureName, featureState } from './args';

/**
 * Replaces the content of a node based on the state of a feature toggle.
 *
 * This function searches for an `ObjectLiteralExpression` within the given node and
 * retrieves the `off` and `on` function properties along with the `name` property.
 * If the name property matches the `removedFeatureName`, the function replaces
 * the content of the node with the body of the appropriate function based on the
 * `featureState`. If `featureState` is `'on'`, it uses the body of the `on` function;
 * if `'off'`, it uses the body of the `off` function.
 *
 * @param {Node} node - The node in which the toggle function content needs to be replaced.
 * @returns {void} - This function does not return a value. It modifies the provided node in place.
 */

export const replaceToggleFunction = (node: Node) => {
    const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression,
    );

    if (!objectOptions) return;

    const offFunctionProperty = objectOptions.getProperty('off');
    const onFunctionProperty = objectOptions.getProperty('on');

    const featureNameProperty = objectOptions.getProperty('name');

    const onFunction = onFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
    );
    const offFunction = offFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
    );
    const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);

    if (featureName !== removedFeatureName) return;

    if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '');
    }

    if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '');
    }
};

import { Node, SyntaxKind } from 'ts-morph';
import { removedFeatureName, featureState } from './args';
import { getAttributeNodeByName } from './getAttributeNodeByName';
import { getReplacedComponent } from './getReplacedComponent';

/**
 * Replaces a JSX component with a feature-specific version based on a feature toggle.
 *
 * This function searches for `on`, `off`, and `feature` attributes in a JSX element's attributes.
 * If the `feature` attribute matches the `removedFeatureName`, it will replace the component with
 * either the value from the `on` or `off` attribute based on the current `featureState`. If the
 * feature state is `'on'`, the value from the `on` attribute is used; if `'off'`, the value from
 * the `off` attribute is used. If no match for the `feature` name is found, no replacement occurs.
 *
 * @param {Node} node - The JSX node where the component replacement will occur.
 * @returns {void} - This function does not return a value but modifies the provided JSX node in place.
 */

export const replaceComponent = (node: Node) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

    const onAttribute = getAttributeNodeByName(attributes, 'on');
    const offAttribute = getAttributeNodeByName(attributes, 'off');

    const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');
    const featureName = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        ?.slice(1, -1);

    if (featureName !== removedFeatureName) return;

    const offValue = getReplacedComponent(offAttribute);
    const onValue = getReplacedComponent(onAttribute);

    if (featureState === 'on' && onValue) {
        node.replaceWithText(onValue);
    }

    if (featureState === 'off' && offValue) {
        node.replaceWithText(offValue);
    }
};

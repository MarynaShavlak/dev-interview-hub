import { Node, Project, SyntaxKind } from 'ts-morph';
import { removedFeatureName, featureState } from './args';
import { replaceComponent } from './replaceComponent';
import { replaceToggleFunction } from './replaceToggleFunction';

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeaturesComponent';

if (!removedFeatureName) {
    throw new Error('Set the name of the feature flag');
}

if (!featureState) {
    throw new Error('Set the status of the feature (on or off)');
}

if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('Incorrect value of feature status (on or off)');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const isToggleFunction = (node: Node) => {
    let isToggleFeatures = false;

    // eslint-disable-next-line consistent-return
    node.forEachChild((child) => {
        if (
            child.isKind(SyntaxKind.Identifier) &&
            child.getText() === toggleFunctionName
        ) {
            // eslint-disable-next-line no-return-assign
            return (isToggleFeatures = true);
        }
    });

    return isToggleFeatures;
};

const isToggleComponent = (node: Node) => {
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

    return identifier?.getText() === toggleComponentName;
};

files.forEach((sourceFile) => {
    // eslint-disable-next-line consistent-return
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            return replaceToggleFunction(node);
        }
        if (
            node.isKind(SyntaxKind.JsxSelfClosingElement) &&
            isToggleComponent(node)
        ) {
            return replaceComponent(node);
        }
    });
});

project.save();

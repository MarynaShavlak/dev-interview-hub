# Documentation: Remove Feature Toggles from Project Codebase

## Overview

This script automates the removal of feature toggles from a TypeScript project by modifying specific function calls and JSX components associated with feature flags. Using the `ts-morph` library, the script updates or removes feature toggles based on the feature state (`on` or `off`). It processes all relevant TypeScript (`.ts`) and TypeScript JSX (`.tsx`) files in the codebase, replacing or removing references to the deprecated features.

### Key Features:
- Automatically scans all TypeScript (`.ts`) and TypeScript JSX (`.tsx`) files in the `src/` directory.
- Identifies and replaces feature toggle functions and components with the appropriate code based on the feature state.
- Support toggles implemented as both function calls and JSX components.
- Saves all changes back to the source files.

## Prerequisites
- **ts-morph**: The script relies on the `ts-morph` library to manipulate TypeScript code. Install it by running:

```bash
npm install ts-morph
```
- The project must use feature toggles with `toggleFeatures` functions and `ToggleFeaturesComponent` components.

## Code Breakdown
### Importing Dependencies
```typescript
import { Node, Project, SyntaxKind } from 'ts-morph';
import { removedFeatureName, featureState } from './args';
import { replaceComponent } from './replaceComponent';
import { replaceToggleFunction } from './replaceToggleFunction';
```
- The `Project` and `Node` from `ts-morph` are used to manipulate source files and their AST (Abstract Syntax Tree).
- `removedFeatureName` and `featureState` capture command-line arguments representing the feature flag name and its status (either `on` or `off`).
- `replaceComponent` and `replaceToggleFunction` are custom functions that handle the replacement of components and functions, respectively.


### Initializing the Project
```typescript
const project = new Project({});
```
- Initializes a new  `ts-morph` project instance.

### Adding Source Files to the Project
```typescript
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');
```
- Loads all TypeScript and TypeScript JSX files in the `src/` directory and its subdirectories.
- 
### Defining Helper Functions to Identify Toggles
#### Toggle Function Check
```typescript
const isToggleFunction = (node: Node) => {
    let isToggleFeatures = false;
    node.forEachChild((child) => {
        if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
            return (isToggleFeatures = true);
        }
    });
    return isToggleFeatures;
};
```
- Detects if a node represents a `toggleFeatures` function call.

#### Toggle Component Check
```typescript
const isToggleComponent = (node: Node) => {
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);
    return identifier?.getText() === 'ToggleFeaturesComponent';
};
```
- Detects if a node represents a `ToggleFeaturesComponent`.

### Processing Files to Remove Feature Toggles
```typescript
files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            return replaceToggleFunction(node);
        }
        if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
            return replaceComponent(node);
        }
    });
});
```
- Iterates over all files and their descendant nodes to find and replace `toggleFeatures` function calls and `ToggleFeaturesComponent` elements based on the specified feature state.

### Saving the Changes
```typescript
project.save();
```
- Saves all modifications to the disk.

## Usage
1. **Install dependencies**: Ensure that `ts-morph `is installed in your project.
```bash
npm install ts-morph
```
2. **Run the script**:  Execute the script to generate public API files and update import statements for shared UI components.
```bash
npx ts-node ./scripts/remove-feature/remove-feature.ts (feature name)  (feature state)
```
or
```bash
npm run remove-feature (feature name)  (feature state)
```
## Example
Before Running the Script:
```typescript jsx
const result = toggleFeatures({
    name: 'isArticleEnabed',
    on: () => 'enabled',
    off: () => 'disabled',
});

<ToggleFeaturesComponent
    feature="isAppRedesigned"
    on={<RedesignedGridViewSkeleton />}
    off={<DeprecatedGridViewSkeleton />}
/>
```

After Running the Script `npm run remove-feature isAppRedesigned on`:
```typescript jsx
const result = toggleFeatures({
    name: 'isArticleEnabed',
    on: () => 'enabled',
    off: () => 'disabled',
});

<RedesignedGridViewSkeleton />
```

After Running the Script `npm run remove-feature isArticleEnabed off`:
```typescript jsx
const result = 'disabled';

<ToggleFeaturesComponent
    feature="isAppRedesigned"
    on={<RedesignedGridViewSkeleton />}
    off={<DeprecatedGridViewSkeleton />}
/>
```

## Conclusion
This script simplifies the process of removing feature flags from a codebase by automatically updating the code to reflect the feature state. It helps in cleaning up deprecated or unnecessary features, improving code maintenance.

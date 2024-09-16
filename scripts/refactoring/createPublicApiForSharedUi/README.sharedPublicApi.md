# Documentation: Create Public API for Shared UI Components

## Overview

This script automates the generation of public API files for shared UI components in a TypeScript project using the `ts-morph` library. 
The script ensures that each directory within the shared UI components folder has an `index.ts` file that re-exports all contents of the directory. 
Additionally, it updates import declarations throughout the project to maintain a consistent path structure for shared UI components.

### Key Features:
- Automatically loads TypeScript (`.ts`) and TypeScript JSX (`.tsx`) files from the `src/` directory.
- Creates an `index.ts` file in each UI component directory within the `src/shared/ui/` folder if it does not already exist.
- Standardizes import statements for shared UI components to use a consistent path format.
- Saves all changes to the disk.

## Prerequisites
- **ts-morph**: The script uses the ts-morph library for source file manipulation. Install it by running:

```bash
npm install ts-morph
```
- A TypeScript project with shared UI components located in the `src/shared/ui/` directory.

## Code Breakdown
### Importing Dependencies
```typescript
import { Project } from 'ts-morph';
import path from 'path';
import { isAbsolutePath } from '../helpers/isAbsolutePath/isAbsolutePath';
```
- The `Project` class from `ts-morph` is used to manage and manipulate a collection of source files in a TypeScript project.
- `path` is used to handle file paths for locating the shared UI components.
- `isAbsolutePath` is a helper function to check if a path is absolute.

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
- Adds all TypeScript (`.ts`) and TypeScript JSX (`.tsx`) files located in the `src/` directory (and its subdirectories) into the project.

### Retrieving and Processing Shared UI Components
```typescript
const uiPath = path.resolve(__dirname, '..', '..', '..', 'src', 'shared', 'ui');
const sharedUiDirectory = project.getDirectory(uiPath);
const subDirs = sharedUiDirectory?.getDirectories();
```
- Resolves the path to the shared UI components directory and retrieves all subdirectories representing individual components.

### Creating or Ensuring Existence of 'index.ts' Files
```typescript
subDirs?.forEach((subDir) => {
    const componentsDirs = subDir.getDirectories();
    componentsDirs.forEach((directory) => {
        const indexFilePath = `${directory.getPath()}/index.ts`;
        const indexFile = directory.getSourceFile(indexFilePath);

        if (!indexFile) {
            const sourceCode = `export * from './${directory.getBaseName()}';`;
            const file = directory.createSourceFile(indexFilePath, sourceCode, { overwrite: true });

            file.save();
        }
    });
});
```
- Checks each UI component directory for the presence of an `index.ts` file. If it doesn't exist, the script creates one that exports all contents of the directory.

### Updating Import Declarations
```typescript
files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();
        const valueWithoutAlias = value.replace('@/', '');

        const segments = valueWithoutAlias.split('/');

        const isSharedLayer = segments?.[0] === 'shared';
        const isUiSlice = segments?.[1] === 'ui';

        if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
            const result = valueWithoutAlias.split('/').slice(0, 4).join('/');
            importDeclaration.setModuleSpecifier(`@/${result}`);
        }
    });
});
```

- Iterates over all source files and updates import paths for shared UI components to ensure they follow a standardized format.

### Saving the Changes
```typescript
project.save();
```
- Saves all modifications to the source files, including newly created `index.ts` files and updated import declarations.

## Usage
1. **Install dependencies**: Ensure that `ts-morph `is installed in your project.
```bash
npm install ts-morph
```
2. **Run the script**:  Execute the script to generate public API files and update import statements for shared UI components.
```bash
ts-node ./scripts/refactoring/createPublicApiForSharedUi/createPublicApiForSharedUi.ts
```
or
```bash
npm run create-publicApi-for-shared-ui
```
## Example
Before running the script, the UI component directory may lack an `index.ts` file, and imports might look like this:
```typescript
import { Button } from 'shared/ui/Button/Button';
```

After running the script, the `index.ts` file is created, and the import is updated as follows:
```typescript
import { Button } from '@/shared/ui/Button';
```

## Conclusion
This script facilitates the management of shared UI components by automating the creation of public API files and ensuring consistent import paths. It streamlines the process of maintaining and using shared components in a TypeScript project.

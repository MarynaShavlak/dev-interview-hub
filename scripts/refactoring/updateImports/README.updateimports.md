# Documentation: Transform Absolute Imports in a TypeScript Project

## Overview

This script modifies a TypeScript project using the `ts-morph` library, which allows for programmatic manipulation of TypeScript source files. 
The script targets import statements in `.ts` and `.tsx` files to replace specific absolute imports with a custom prefix (`@/`). 
It automatically scans the source code, finds relevant import statements, and updates them.

### Key Features:
- Automatically loads TypeScript (`.ts`) and TypeScript JSX (`.tsx`) files.
- Identifies import statements that use absolute paths from specified layers.
- Rewrites absolute imports to use the `@/` prefix.
- Saves the modified files back to disk.

## Prerequisites
- **ts-morph**: The script relies on the `ts-morph` library to manipulate TypeScript source code. Install it by running:
 
```bash
npm install ts-morph
```
- A TypeScript project with source files in the `src/` directory.


## Code Breakdown
### Importing ts-morph
```typescript
import { Project } from 'ts-morph';
import { isAbsolutePath } from '../helpers/isAbsolutePath/isAbsolutePath';
```
- The `Project` class from `ts-morph` is used to manage and manipulate a collection of source files in a TypeScript project.
- `isAbsolutePath` is a helper function to check if a path is absolute.
### Initializing the Project
```typescript
const project = new Project({});
```
- Initializes an empty `ts-morph` project. This instance will be used to load, inspect, and modify TypeScript files.

### Adding Source Files to the Project
```typescript
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');
```
- Loads all TypeScript (`.ts`) and TypeScript JSX (`.tsx`) files located in the `src/` directory (and its subdirectories) into the project.

### Retrieving Loaded Files
```typescript
const files = project.getSourceFiles();
```
- Retrieves an array of all the source files that were added to the project.

### Checking for Absolute Imports
- The `isAbsolute` function checks if a module specifier (import path) belongs to one of the predefined "layers" (`app`, `shared`, `entities`, etc.).
- It returns `true` if the import path starts with any of these layers, indicating an absolute import.

### Processing Import Declarations
```typescript
files.forEach((sourceFile) => {
const importDeclarations = sourceFile.getImportDeclarations();
importDeclarations.forEach((importDeclaration) => {
const value = importDeclaration.getModuleSpecifierValue();

        if (isAbsolute(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
});
```

- The script iterates over each source file and retrieves its import declarations.
- For each import declaration, it checks if the module specifier is an absolute import (using the `isAbsolute` function).
- If the import is absolute, it updates the module specifier to prefix the path with `@/`.

### Saving the Changes
```typescript
project.save();
```
- Once all the necessary changes have been made, the script saves the modified files to disk.

## Usage
1. **Install dependencies**: Ensure that `ts-morph `is installed in your project.
```bash
npm install ts-morph
```
2. **Run the script**: Execute the script to update import statements in your TypeScript project
```bash
ts-node .\scripts\refactoring\updateImports\updateImports.ts
```
 or 
```bash
npm run update-absolute-import
```
## Example
Before running the script, an import statement might look like this:
```typescript
import { MyComponent } from 'shared/components/MyComponent';
```

After running the script, the import will be updated as follows:
```typescript
import { MyComponent } from '@/shared/components/MyComponent';
```

## Conclusion
This script simplifies the task of modifying absolute imports in a TypeScript project. It automatically scans and updates all relevant files, ensuring that absolute imports from specific layers are prefixed with `@/.`

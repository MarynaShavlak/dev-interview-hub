# Documentation: Slice Generation Script

## Overview
This script automates the creation of a new slice in a TypeScript project, specifically setting up the necessary directory structure and files for a Redux slice. 
It manages the creation of directories, TypeScript files, and other related files required for a slice in the specified layer of the project. 
This streamlines the process of adding new slices by ensuring consistency and saving time.

### Key Features:
- **Directory Structure Creation**: Automatically generates a directory structure for the slice, including subdirectories for model, UI, and testing.
- **Model Files**: Sets up Redux slice files and type definitions.
- **UI Components**: Creates UI components, styles, and stories for the slice.
- **Public API**: Generates an `index.ts` file to export the slice’s main components and schema.


## Usage
- **Run the Script**: Execute the script from the command line with the layer and sliceName parameters. For example:
```bash
node scripts/createSlice/generate-fsd-slice.js  features AuthByUsername
```
or 
```bash 
npm run generate:slice features  AuthByUsername
```
This command will create a slice named `AuthByUsername` under the `features` layer, setting up all necessary files and directories.

## Example
Assuming the script is executed with the following command `npm run generate:slice features  AuthByUsername`.
The script will:
- Create a directory structure at `src/features/AuthByUsername/`.
- Generate TypeScript files such as `AuthByUsernameSlice.ts` and `AuthByUsernameSchema.ts` in the appropriate subdirectories.
- Create UI components, styles, and stories in `src/features/AuthByUsername/ui/`.
- Set up an `index.ts` file exporting the slice component and schema.

### ## Module Structure

The generated module is organized into several directories:
```text
src/features/AuthByUsername/
├── model/
│   ├── selectors/
│   ├── services/
│   ├── slice/
│   │   └── AuthByUsernameSlice.ts
│   └── types/
│       └── AuthByUsernameSchema.ts
├── ui/
│   ├── AuthByUsername/
│   │   ├── AuthByUsername.tsx
│   │   ├── AuthByUsername.stories.tsx
│   │   └── AuthByUsername.module.scss
└── index.ts
```



## Conclusion
This script facilitates the initialization of new slices within a TypeScript project by automating the creation of directories and files. 
It ensures that all necessary components are set up consistently and efficiently, saving time and reducing the potential for manual errors.

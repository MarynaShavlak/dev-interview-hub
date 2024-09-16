import { Project } from 'ts-morph';
import path from 'path';
import { isAbsolutePath } from '../helpers/isAbsolutePath/isAbsolutePath';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();
const uiPath = path.resolve(__dirname, '..', '..', '..', 'src', 'shared', 'ui');
const sharedUiDirectory = project.getDirectory(uiPath);

const subDirs = sharedUiDirectory?.getDirectories();

subDirs?.forEach((subDir) => {
    const componentsDirs = subDir.getDirectories();
    componentsDirs.forEach((directory) => {
        const indexFilePath = `${directory.getPath()}/index.ts`;
        const indexFile = directory.getSourceFile(indexFilePath);

        if (!indexFile) {
            const sourceCode = `export * from './${directory.getBaseName()}';`;
            const file = directory.createSourceFile(indexFilePath, sourceCode, {
                overwrite: true,
            });

            file.save();
        }
    });
});

files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();
        const valueWithoutAlias = value.replace('@/', '');

        const segments = valueWithoutAlias.split('/');

        const isSharedLayer = segments?.[0] === 'shared';
        const isUiSlice = segments?.[1] === 'ui';

        if (isAbsolutePath(valueWithoutAlias) && isSharedLayer && isUiSlice) {
            const result = valueWithoutAlias.split('/').slice(0, 4).join('/');
            importDeclaration.setModuleSpecifier(`@/${result}`);
        }
    });
});

project.save();

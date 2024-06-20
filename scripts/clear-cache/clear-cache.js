const path = require('path');
const fs = require('fs/promises');

const cachePath = path.resolve(__dirname, '..', 'node_modules', '.cache');
async function deleteDirectory(directoryPath) {
    try {
        await fs.rm(directoryPath, { recursive: true, force: true });
    } catch (err) {
        console.error(`Error while deleting ${directoryPath}:`, err);
    }
}
deleteDirectory(cachePath);

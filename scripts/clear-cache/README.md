# Script clear-cache.js

This script is designed to be run as a post-install script in a Node.js project.
Its primary function is to clear the cache directory located within the **'node_modules'** folder, specifically targeting the cache directory used by Babel loader.
This can be useful to ensure that no stale cache is left after installing dependencies, potentially avoiding issues related to outdated or corrupt cached files, especially for parts of the code that change rarely.

## How It Works
1. **Path Resolution**:
    -  The script uses the **'path'** module to resolve the path to the cache directory. It constructs the path by navigating up one directory from the script's location and then into the **'node_modules/.cache'** directory.
2. **Delete Directory Function**:
    -  The **'deleteDirectory'** function takes a directory path as an argument and attempts to delete it using **'fs.rm'** with options **'recursive: true'** and **'force: true'**. These options ensure that the directory and its contents are deleted even if they are not empty, and the operation does not fail if the directory does not exist.
3. **Error Handling**:
    -  If an error occurs during the deletion process, it is caught and logged to the console with a descriptive message, which can help in diagnosing permission issues or other filesystem-related problems.

## Usage
### **As a Post-Install Script**
To use clear-cache.js as a post-install script, you need to add it to the scripts section of your package.json file:
```javascript
{
  "scripts": {
    "postinstall": "node ./scripts/clear-cache/clear-cache.js"
  }
}
```

### **Running Manually**
You can also run this script manually if needed:
```bash
node ./scripts/clear-cache/clear-cache.js
```
## Error Handling
If the script encounters any issues while trying to delete the cache directory, it will log an error message to the console. This can help in diagnosing permission issues or other filesystem-related problems.

## Benefits

- **Prevents Stale Cache Issues:** Ensures that any potentially outdated or corrupt cache files are removed after dependencies are installed.
- **Targets Babel Loader Cache:** Specifically clears the **'.cache'** directory used by Babel loader, which can contain parts of the code that change rarely.
- **Automated Cleanup:** Integrates seamlessly into the post-install process, requiring no manual intervention.
- **Simple and Effective:** A straightforward approach to managing the cache, leveraging Node.js's built-in modules.

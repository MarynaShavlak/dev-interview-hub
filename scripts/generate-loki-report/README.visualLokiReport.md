# Documentation: Generate Loki Report

## Overview

This script generates a `report.json` file for Loki visual regression testing. 
It reads the contents of the `difference` directory, which contains the visual diffs between the current and reference images, and creates a JSON report summarizing the test results. 
This report includes lists of new, deleted, passed, failed, expected, and actual items, and provides relative paths to the directories involved in the testing process.


## Usage
1. **Ensure Node.js is installed**: This script requires Node.js.
2. **Run the script**: 
```bash
node scripts/generate-loki-report/generate-visual-loki-report.js
```
or 
```bash
npm run test:ui:json
```
## Example
After running the script, the `report.json` file will be created in the `.loki` directory, summarizing the visual regression test results with lists of items and directory paths.

## Conclusion
This script simplifies the process of generating a visual regression test report by automating the creation of a JSON file that details the results of the visual comparisons. 
It helps in tracking the state of visual diffs between the current and reference images.

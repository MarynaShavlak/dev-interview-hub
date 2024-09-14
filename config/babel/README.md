# Custom Babel Plugin Description

This module exports a Babel plugin function designed to remove specific JSX properties from the code during transformation. This plugin helps in cleaning up JSX elements by excluding certain properties, enhancing code quality and security.

## Function: Default Export

### Returns

- **`PluginItem`**: A Babel plugin object with a `visitor` configuration to traverse and modify the AST.

### Plugin Configuration

- **`visitor`**:
    - **`Program`**: Traverses the entire program's AST.
        - **`path`**: Represents the current AST node path.
        - **`state`**: Contains options, specifically `props`, which is a list of JSX properties to be removed.
        - **`forbidden`**: An array of property names that should be removed from JSX elements.

    - **`JSXIdentifier`**:
        - **Purpose**: Identifies JSX properties.
        - **Logic**: If a property name matches any in the `forbidden` list, it is removed from the JSX element by deleting the parent path.

### Usage

The plugin is configured to exclude specified JSX properties during the Babel transformation, making it suitable for use in production builds where certain properties (like `data-testid`) should not be present. This ensures that the final code output is clean and secure.


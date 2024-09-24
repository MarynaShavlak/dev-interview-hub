# Working with Feature Flags

The use of feature flags is only allowed through the `toggleFeatures` helper or `ToggleFeaturesComponent` component.
To ensure that feature flags are consistently and correctly implemented, a custom ESLint plugin  <a href="https://www.npmjs.com/package/eslint-plugin-toggle-features-rule-plugin" target="_blank">eslint-plugin-toggle-features-rule-plugin</a> has been developed.
This plugin enforces specific rules that simplify feature flag management and ensure compatibility with automatic feature flag removal scripts.

## [toggleFeatures](./lib/toggleFeatures/README.md)  Helper
The `toggleFeatures` helper is used to control the logic based on the feature flag status. It accepts an object with the following options::
```javascript
const options = {
  name: 'feature-flag-name',  // Name of the feature flag
  on: () => {}, // logic to execute when the feature is enabled 
  off: () => {}, // logic to execute when the feature is disabled 
}
```

## [ToggleFeaturesComponent](./components/ToggleFeaturesComponent/README.md)
The `ToggleFeaturesComponent` is a React component designed to toggle between two different UI elements based on the state of a feature flag. It takes the following props:

- `feature`: The name of the feature flag.
- `on`: The React element to render when the feature is enabled.
- `off`: The React element to render when the feature is disabled.

## Custom ESLint Plugin: `eslint-plugin-toggle-features-rule-plugin`

This project includes a custom ESLint plugin with two key rules that enforce proper feature flag usage and support automated feature flag removal:

1. **`one-line-arrow-function`**:
    - Enforces one-line arrow functions for the `on` and `off` options in the `toggleFeatures` helper, ensuring concise and maintainable logic.
2. **`component-jsx-props`**:
    - Ensures only JSX elements are passed directly to the `on` and `off` props of `ToggleFeaturesComponent`, preventing the use of variables.

Following these rules ensures clean, automated feature flag removal.

## Removing Feature Flags
To automatically remove a feature flag, use the [remove-feature.ts](../../../../scripts/remove-feature/README.removeFeature.md) script, which takes two arguments:
1. The name of the feature flag to be removed
2. The feature state (`on`/`off`)

> [!IMPORTANT]
> The success of automatic feature flag removal is directly tied to the proper use of the custom ESLint plugin. By adhering to the rules defined in the plugin, you ensure that the feature toggle logic is structured in a way that allows for clean, automated feature removal.


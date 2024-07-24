# Functions for Working with Feature Flags

These functions manage feature flags in a React application, enabling the customization of features based on specific conditions and user preferences.

# Default Features
```typescript
const defaultFeatures: FeatureFlags = {
    isAppRedesigned: localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};
```
Initializes the default feature flags based on the value stored in `localStorage`. 
Specifically, it checks if the application's redesign is enabled by comparing the value of `LOCAL_STORAGE_LAST_DESIGN_KEY` to `'new'`.

Note:**Note**: Feature flags do not change during the session and do not need to be reactive.

## Feature Flags Variable

Holds the current state of feature flags, initially set to the default features. This variable is used to store and retrieve feature flag values throughout the application.

```typescript
let featureFlags: FeatureFlags = {
    ...defaultFeatures,
};
```

### Functions for Working with Feature Flags

| Function                      | Description                                                         | Parameters                                                                                                     | Returns                              | Usage Example                                                              |
|-------------------------------|---------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|--------------------------------------|----------------------------------------------------------------------------|
| `setFeatureFlags`             | Updates the current feature flags with a new set of feature flags.  | `newFeatureFlags` <br/>An optional object containing the new feature flags to set.<br/> (Type: `FeatureFlags`) | `void`                               | setFeatureFlags({ isArticleRatingEnabled: true, isAppRedesigned: false })  |
| `getFeatureFlag`              | Retrieves the value of a specific feature flag.                     | `flag` <br/>The key of the feature flag to retrieve.<br/> Type:  (`keyof FeatureFlags`)                        | `boolean` or `undefined`             | const isRedesigned = getFeatureFlag('isAppRedesigned')                     |
| `getAllFeatureFlags`          | Retrieves all the current feature flags.                            | None                                                                                                           | `FeatureFlags`                       | const allFlags = getAllFeatureFlags()                                      |

# Regular Unit Tests with Jest

The project includes comprehensive unit tests to ensure that individual functions and modules work as expected.

## 1. [classNames](../../../src/shared/lib/classes/classNames/classNames.test.ts) Function

| Aspect                           | Purpose                                                                                                         | Notes                                 |
|----------------------------------|-----------------------------------------------------------------------------------------------------------------|---------------------------------------|
| **Functionality**                | Tests that the `classNames` function correctly combines class names based on provided parameters.              | Includes base classes, additional classes, and conditional modifications (`mods`). |

## 2. [getFlexClasses](../../../src/shared/lib/classes/getFlexClasses/getFlexClasses.test.ts) Function


| Aspect                           | Purpose                                                                                                         | Notes                                 |
|----------------------------------|-----------------------------------------------------------------------------------------------------------------|---------------------------------------|
| **Functionality**                | Verifies that the `getFlexClasses` function generates the appropriate array of CSS class names based on flexbox configuration options. | Covers vertical/horizontal stacking, gap spacing, justification, and alignment. |

## 3. [addQueryParams](../../../src/shared/lib/url/addQueryParams/addQueryParams.test.ts) Function


| Aspect                           | Purpose                                                                                                         | Notes                                 |
|----------------------------------|-----------------------------------------------------------------------------------------------------------------|---------------------------------------|
| **Functionality**                | Ensures that the `addQueryParams` function correctly adds or updates query parameters in the browser's URL.     | Handles one or multiple parameters, undefined values, and ensures only valid parameters are included. |

## 4. [toggleFeatures](../../../src/shared/lib/features/lib/toggleFeatures/toggleFeatures.test.ts) Function


| Aspect                           | Purpose                                                                                                         | Notes                                 |
|----------------------------------|-----------------------------------------------------------------------------------------------------------------|---------------------------------------|
| **Functionality**                | Validates the behavior of the `toggleFeatures` function in managing feature flags within a React application. | Tests include enabled, disabled, undefined, and null flags; edge cases where `on()` and `off()` return the same value. |

## 5. [trimText](../../../src/shared/lib/text/trimText/trimText.test.ts) Function

| Aspect                           | Purpose                                                                                                         | Notes                                 |
|----------------------------------|-----------------------------------------------------------------------------------------------------------------|---------------------------------------|
| **Functionality**                | Ensures that the `trimText` function correctly removes leading and trailing whitespace from a string.            | Covers various whitespace scenarios, empty strings, and `undefined` or `null` inputs. |


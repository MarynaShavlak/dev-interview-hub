# getFlexClasses Function

The `getFlexClasses` function constructs an array of CSS class names based on the provided flexbox configuration options. 
It generates class names for vertical and horizontal stacking, gap sizes, alignment, justification, and direction based on the given parameters.

## Purpose
The function allows for flexible and responsive layout adjustments by applying a combination of styles based on the provided configuration. 
It eliminates the need to create additional wrapper components (such as `HStack` or `VStack`), streamlining the layout process and reducing complexity.1. Save the URL with the selected filters as a bookmark or in a file for later use.

## Parameters:

**Note:** All parameters are optional. If not provided, default styles will be used.

| Parameter | Type       | Description                                                        |
|-----------|------------|--------------------------------------------------------------------|
| `vStack`  | `boolean`   |  If `true`, applies a vertical stack layout (`cls.vStack`). |
| `hStack`  | `boolean`   |  If `true`, applies a horizontal stack layout (`cls.hStack`). |
| `gap`     | `FlexGap`   |  Defines the gap size between items. Maps to `mapGapToClass`. |
| `justify` | `FlexJustify` |  Defines the justification of items. Maps to `mapJustifyToClass`. |
| `align`   | `FlexAlign` |  Defines the alignment of items. Maps to `mapAlignToClass`. |
| `direction` | `FlexDirection` |  Defines the direction of the flex container. Maps to `mapDirectionToClass`. |

## Returns:
- An array of CSS class names that reflect the specified flexbox configuration. 
The array includes classes for direction, stacking, gap, justification, and alignment in the order they are applied.


## Implementation 
- This function dynamically constructs a list of CSS class names based on a configuration object that specifies layout options. 
It leverages mappings of flexbox properties to CSS classes to apply the appropriate styling based on the input parameters. 
This is particularly useful for managing complex flexbox layouts in a modular and maintainable way.
- The function uses predefined mappings (`mapJustifyToClass`, `mapAlignToClass`, `mapDirectionToClass`, and `mapGapToClass`) to translate flexbox configuration values into corresponding CSS classes.

## Usage Example:
```typescript
const flexClasses = getFlexClasses({
  vStack: true,
  gap: 8,
  justify: 'center',
  align: 'start',
  direction: 'column',
});
// flexClasses: ['vStack', 'gap8', 'justifyCenter', 'alignStart', 'directionColumn']

const noFlexClasses = getFlexClasses({});
// noFlexClasses: []
```

# trimText Function
The `trimText`  function removes leading and trailing whitespace from a given string. If the input string is `undefined` or `null`, the function returns an empty string. 
This is useful for ensuring that text input is cleaned of extra spaces before processing or displaying it.

## Purpose
The `trimText` function is particularly useful in scenarios where you need to clean up text before storing it, performing comparisons, or displaying it. 
By handling `undefined` or `null` values gracefully, it ensures that the function always returns a consistent result.

## Parameters:
- `value`: _Optional_. A string that you want to trim. If value is `undefined` or `null`, it will be treated as an empty string.

### Returns:
- A string with leading and trailing whitespace removed. If the input is `undefined` or `null`, an empty string is returned.

### Usage Example:
```typescript
const result1 = trimText('   Hello, World!   ');
// result1: 'Hello, World!'

const result2 = trimText(undefined);
// result2: ''

const result3 = trimText(null);
// result3: ''
```

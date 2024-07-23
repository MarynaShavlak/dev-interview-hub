# Functions for work with url

## Purpose
These functions are particularly useful for maintaining and sharing state in web applications through URL parameters. By incorporating selected filters directly into the query string, you can:

1. Save the URL with the selected filters as a bookmark or in a file for later use.

2. Share the URL with another user, allowing them to open the page with the filters already applied.
This approach enhances user experience by providing a way to easily store and share specific states of the application. 


Note: In the `getQueryParams` and `addQueryParams` functions, some query parameters might not be provided, so using `OptionalRecord` accommodates this by allowing undefined values.


## getQueryParams Function
The `getQueryParams` function constructs a query string by adding or updating parameters in the current URL's query string. 
It takes an object of parameters, iterates through each key-value pair, and sets the corresponding query parameter in the URL. 
If a value is `undefined`, it does not include that parameter in the query string.

### Parameters:
- `params`: An object of type `OptionalRecord<string, string>`. 
This object contains key-value pairs where the key is the parameter name, and the value is the parameter value. 
If the value is `undefined`, the parameter is not included in the query string.

### Returns:
- A string representing the updated query string, starting with `?`.

### Usage Example:
```typescript
const params = { user: 'Maryna', age: '29' };
const queryString = getQueryParams(params);
// queryString: '?user=Maryna&age=29'
```

## addQueryParams Function
The `addQueryParams` function updates the browser's URL by adding or updating the query parameters without reloading the page. 
It utilizes the `getQueryParams` function to construct the query string and then uses the `window.history.pushState` method form History API to update the URL.
This allows for dynamic URL updates based on the provided parameters.

### Parameters:
- `params`: An object of type `OptionalRecord<string, string>`.
  This object contains key-value pairs where the key is the parameter name, and the value is the parameter value.
  If the value is `undefined`, the parameter is not included in the query string.
### Usage Example:
```typescript
const params = { user: 'Maryna', age: '29' };
addQueryParams(params);
// The browser's URL is updated to include '?user=Maryna&age=29' without reloading the page.
```

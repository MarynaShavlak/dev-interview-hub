# API Client Configuration

This project uses **'axios'** to handle HTTP requests. An **'axios'** instance is created and configured to include authorization tokens in the request headers. Below is an example of how this configuration is set up.

## Create Axios Instance
An **'axios'** instance is created with a base URL. The base URL is defined by the **'__API__'** environment variable:

```typescript
export const $api = axios.create({
    baseURL: __API__,
});
```

## Request Interceptor

A request interceptor is added to the **'axios'** instance. This interceptor adds an **'Authorization'** header to every request if a user token is found in **'localStorage'**.
```typescript
$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization =
            localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    }
    return config;
});
```

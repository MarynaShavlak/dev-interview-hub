# Service Worker Configuration  Documentation

The `config-sw.js` file configures a service worker using Workbox for efficient caching and offline capabilities in your application.

## Key Features

- **Precaching**: Registers specified assets from `self.__WB_MANIFEST` for offline access.
- **Routing**: Defines caching strategies for various network requests using `registerRoute` from Workbox.

## Cache Strategies


| **Resource Type**              | **Strategy**           | **Cache Name**                 | **Plugins**                                                   | **Max Age**         | **Max Entries** | **Purpose** |
|--------------------------------|------------------------|--------------------------------|----------------------------------------------------------------|----------------------|----------------|------------|
| Google Fonts Stylesheets       | Stale-While-Revalidate | `google-fonts-stylesheets`    | N/A                                                            | N/A                  | N/A            | Ensures fast loading by serving cached stylesheets while fetching updates in the background. |
| Google Fonts Webfonts          | Cache-First           | `google-fonts-webfonts`       | `CacheableResponsePlugin (0, 200)`, `ExpirationPlugin`         | 365 days             | 30             | Caches font files for quick access, reducing external requests. |
| Firebase Storage Images        | Cache-First           | `firebase-images`            | `CacheableResponsePlugin (0, 200)`, `ExpirationPlugin`         | 30 days              | 100            | Improves performance by caching frequently accessed images from Firebase Storage. |
| Generic Images                 | Cache-First           | `images`                     | `CacheableResponsePlugin (0, 200)`, `ExpirationPlugin`         | 30 days              | 60             | Optimizes image loading speed by caching common images. |
| Static Resources (Scripts, CSS) | Stale-While-Revalidate | `static-resources`           | N/A                                                            | N/A                  | N/A            | Ensures smooth page load by caching JavaScript and CSS files while keeping them updated. |



## Usage

The service worker configuration enhances application performance by caching assets intelligently, ensuring a reliable offline experience and faster load times for users.

# Route Configuration Documentation

This documentation outlines the route configuration for a React application, specifying paths, components, and access control for each route.

## Imports
The configuration starts with importing necessary entities, pages, route constants, and types from various modules.

```javascript
import { UserRole } from '@/entities/User';
import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import {
    AppRoutes,
    getRouteAbout,
    getRouteAdmin,
    getRouteArticleCreate,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteForbidden,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';
```

## Route Configuration

The **'routeConfig"** object maps route constants to route properties, including the path, component to render, and access control settings.
```javascript
export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: getRouteArticleCreate(),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdmin(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
```
## Route Properties
Each route configuration contains the following properties:

- **path**: The URL path associated with the route.
- **element**: The React component to be rendered for the route.
- **authOnly** _(optional)_: A boolean indicating if authentication is required to access the route.
- **roles** _(optional)_: An array of user roles that are authorized to access the route. Only applicable if **_'authOnly'_** is **_true_**.

## Routes Description
| Page                  | Path                           | Component               | Auth Only | Roles                                |
| --------------------- | ------------------------------ | ----------------------- |  :---: | ------------------------------------ |
| Main Page             | `getRouteMain()`               | `<MainPage />`          | ❌        | -                                    |
| About Page            | `getRouteAbout()`              | `<AboutPage />`         | ❌        | -                                    |
| Profile Page          | `getRouteProfile(':id')`       | `<ProfilePage />`       | ✅       | -                                    |
| Articles Page         | `getRouteArticles()`           | `<ArticlesPage />`      | ✅     | -                                    |
| Article Details Page  | `getRouteArticleDetails(':id')`| `<ArticleDetailsPage />`| ✅      | -                                    |
| Create Article Page   | `getRouteArticleCreate()`      | `<ArticleEditPage />`   | ✅      | -                                    |
| Edit Article Page     | `getRouteArticleEdit(':id')`   | `<ArticleEditPage />`   | ✅      | -                                    |
| Admin Panel           | `getRouteAdmin()`              | `<AdminPanelPage />`    | ✅      | [UserRole.MANAGER, UserRole.ADMIN]   |
| Forbidden Page        | `getRouteForbidden()`          | `<ForbiddenPage />`     | ❌        | -                                    |
| Not Found Page        | `*`                            | `<NotFoundPage />`      | ❌       | -                                    |

This configuration ensures proper routing, component rendering, and access control across the application.

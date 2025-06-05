import { UserRole } from '@/entities/User';
import { AdminPanelPage, AdminPanelPageSkeleton } from '@/pages/AdminPanelPage';
import {
    ArticleDetailsPage,
    ArticleDetailsPageSkeleton,
} from '@/pages/ArticleDetailsPage';

import { ArticlesPage, ArticlesPageSkeleton } from '@/pages/ArticlesPage';
import { ForbiddenPage, ForbiddenPageSkeleton } from '@/pages/ForbiddenPage';
import { MainPage, MainPageSkeleton } from '@/pages/MainPage';
import { NotFoundPage, NotFoundPageSkeleton } from '@/pages/NotFoundPage';
import { ProfilePage, ProfilePageSkeleton } from '@/pages/ProfilePage';
import { SettingsPage, SettingsPageSkeleton } from '@/pages/SettingsPage';
import { MyArticlesPage, MyArticlesPageSkeleton } from '@/pages/MyArticlesPage';
import {
    AppRoutes,
    getRouteAdmin,
    getRouteArticleCreate,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteForbidden,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
    getRouteSettings,
    getRouteMyArticles,
    getRouteUsefulLinks,
} from '@/shared/const/router/router';
import { AppRoutesProps } from '@/shared/types/router';
import {
    ArticleEditorPage,
    ArticleEditorPageSkeleton,
} from '@/pages/ArticleEditorPage';
import {
    UsefulLinksPage,
    UsefulLinksPageSkeleton,
} from '@/pages/UsefulLinksPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
        skeleton: <MainPageSkeleton />,
    },
    [AppRoutes.SETTINGS]: {
        path: getRouteSettings(),
        element: <SettingsPage />,
        authOnly: true,
        skeleton: <SettingsPageSkeleton />,
    },

    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
        skeleton: <ProfilePageSkeleton />,
    },
    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true,
        skeleton: <ArticlesPageSkeleton />,
    },
    [AppRoutes.MY_ARTICLES]: {
        path: getRouteMyArticles(),
        element: <MyArticlesPage />,
        authOnly: true,
        skeleton: <MyArticlesPageSkeleton />,
    },
    [AppRoutes.USEFUL_LINKS]: {
        path: getRouteUsefulLinks(),
        element: <UsefulLinksPage />,
        authOnly: true,
        skeleton: <UsefulLinksPageSkeleton />,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage />,
        authOnly: true,
        skeleton: <ArticleDetailsPageSkeleton />,
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: getRouteArticleCreate(),
        element: <ArticleEditorPage />,
        authOnly: true,
        skeleton: <ArticleEditorPageSkeleton />,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditorPage />,
        authOnly: true,
        skeleton: <ArticleEditorPageSkeleton />,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdmin(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN],
        skeleton: <AdminPanelPageSkeleton />,
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
        skeleton: <ForbiddenPageSkeleton />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
        skeleton: <NotFoundPageSkeleton />,
    },
};

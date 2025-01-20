import { RedesignedUserCardSkeleton as ProfileSkeleton } from '@/entities/Profile';
import { UserRole } from '@/entities/User';
import { AboutPage, AboutPageSkeleton } from '@/pages/AboutPage';
import { AdminPanelPage, AdminPanelPageSkeleton } from '@/pages/AdminPanelPage';
import {
    ArticleDetailsPage,
    ArticleDetailsPageSkeleton,
} from '@/pages/ArticleDetailsPage';

import { ArticlesPage, ArticlesPageSkeleton } from '@/pages/ArticlesPage';
import { ForbiddenPage, ForbiddenPageSkeleton } from '@/pages/ForbiddenPage';
import { MainPage, MainPageSkeleton } from '@/pages/MainPage';
import { NotFoundPage, NotFoundPageSkeleton } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage, SettingsPageSkeleton } from '@/pages/SettingsPage';
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
    getRouteSettings,
    getRouteMyArticles,
} from '@/shared/const/router/router';
import { AppRoutesProps } from '@/shared/types/router';
import {
    ArticleEditorPage,
    ArticleEditorPageSkeleton,
} from '@/pages/ArticleEditorPage';

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
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
        skeleton: <AboutPageSkeleton />,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
        skeleton: <ProfileSkeleton />,
    },
    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true,
        skeleton: <ArticlesPageSkeleton />,
    },
    [AppRoutes.MY_ARTICLES]: {
        path: getRouteMyArticles(),
        element: <ArticlesPage />,
        authOnly: true,
        skeleton: <ArticlesPageSkeleton />,
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

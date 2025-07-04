import {
    HRInterviewAnswerEditorPage,
    HRInterviewQAEditorPageSkeleton,
} from '@/pages/HRInterviewAnswerEditorPage';
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
    getRouteHRInterviewQACreate,
    getRouteHRInterview,
    getRouteHRInterviewQueue,
    getRouteHRInterviewEditor,
    getRouteHRInterviewAnswerEdit,
    getRouteEnglish,
    getRouteLiveCodeTaskEdit,
    getRouteLiveCodeTaskCreate,
    getRouteLiveCodeTasks,
    getRouteLiveCodeTaskDetails,
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
import {
    HRInterviewPage,
    HRInterviewPageSkeleton,
} from '@/pages/HRInterviewPage';
import {
    HRInterviewQueuePage,
    HRInterviewQueuePageSkeleton,
} from '@/pages/HRInterviewQueuePage';
import {
    HRInterviewEditorTablePage,
    HRInterviewEditorTablePageSkeleton,
} from '@/pages/HRInterviewEditorTablePage';
import { EnglishPageSkeleton, EnglishPage } from '@/pages/EnglishPage';
import {
    LiveCodeTaskEditorPage,
    LiveCodeTaskEditorPageSkeleton,
} from '@/pages/LiveCodeTaskEditorPage';
import {
    LiveCodeTasksPage,
    LiveCodeTasksPageSkeleton,
} from '@/pages/LiveCodeTasksPage';
import {
    LiveCodeTaskDetailsPageSkeleton,
    LiveCodeTaskDetailsPage,
} from '@/pages/LiveCodeTaskDetailsPage';

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
    [AppRoutes.ENGLISH]: {
        path: getRouteEnglish(),
        element: <EnglishPage />,
        authOnly: true,
        skeleton: <EnglishPageSkeleton />,
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
    [AppRoutes.HR_INTERVIEW]: {
        path: getRouteHRInterview(),
        element: <HRInterviewPage />,
        authOnly: true,
        skeleton: <HRInterviewPageSkeleton />,
    },
    [AppRoutes.HR_INTERVIEW_EDITOR]: {
        path: getRouteHRInterviewEditor(),
        element: <HRInterviewEditorTablePage />,
        authOnly: true,
        skeleton: <HRInterviewEditorTablePageSkeleton />,
    },
    [AppRoutes.HR_INTERVIEW_QUEUE]: {
        path: getRouteHRInterviewQueue(),
        element: <HRInterviewQueuePage />,
        authOnly: true,
        skeleton: <HRInterviewQueuePageSkeleton />,
    },
    [AppRoutes.HR_INTERVIEW_CREATE]: {
        path: getRouteHRInterviewQACreate(),
        element: <HRInterviewAnswerEditorPage />,
        authOnly: true,
        skeleton: <HRInterviewQAEditorPageSkeleton />,
    },
    [AppRoutes.HR_INTERVIEW_ANSWER_EDIT]: {
        path: getRouteHRInterviewAnswerEdit(':id'),
        element: <HRInterviewAnswerEditorPage />,
        authOnly: true,
        skeleton: <HRInterviewQAEditorPageSkeleton />,
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
    [AppRoutes.LIVE_CODE_TASKS]: {
        path: getRouteLiveCodeTasks(),
        element: <LiveCodeTasksPage />,
        authOnly: true,
        skeleton: <LiveCodeTasksPageSkeleton />,
    },
    [AppRoutes.LIVE_CODE_TASK_EDIT]: {
        path: getRouteLiveCodeTaskEdit(':id'),
        element: <LiveCodeTaskEditorPage />,
        authOnly: true,
        skeleton: <LiveCodeTaskEditorPageSkeleton />,
    },
    [AppRoutes.LIVE_CODE_TASK_CREATE]: {
        path: getRouteLiveCodeTaskCreate(),
        element: <LiveCodeTaskEditorPage />,
        authOnly: true,
        skeleton: <LiveCodeTaskEditorPageSkeleton />,
    },
    [AppRoutes.LIVE_CODE_TASK_DETAILS]: {
        path: getRouteLiveCodeTaskDetails(':id'),
        element: <LiveCodeTaskDetailsPage />,
        authOnly: true,
        skeleton: <LiveCodeTaskDetailsPageSkeleton />,
    },
};

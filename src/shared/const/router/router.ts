export enum AppRoutes {
    MAIN = 'main',
    SETTINGS = 'settings',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    MY_ARTICLES = 'my_articles_lib',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    USEFUL_LINKS = 'useful_links',
    HR_INTERVIEW_CREATE = 'hr_interview_qa_create',
    HR_INTERVIEW = 'hr_interview',
    HR_INTERVIEW_QUEUE = 'hr_interview_queue',
    HR_INTERVIEW_EDITOR = 'hr_interview_editor',
    HR_INTERVIEW_ANSWER_EDIT = 'hr_interview_answer_edit',
    LIVE_CODE_TASKS = 'live_code_tasks',
    LIVE_CODE_TASK_EDIT = 'live_code_task_edit',
    LIVE_CODE_TASK_CREATE = 'live_code_task_create',
    ENGLISH = 'english',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found',
}
export const getRouteMain = () => '/';
export const getRouteSettings = () => '/settings';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => `/article/${id}`;
export const getRouteArticleCreate = () => '/article/new';
export const getRouteArticleEdit = (id: string) => `/article/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
export const getRouteMyArticles = () => '/my-articles-lib';
export const getRouteUsefulLinks = () => '/useful-links';
export const getRouteEnglish = () => '/english';
export const getRouteHRInterviewQACreate = () => '/hr-interview-qa/new';
export const getRouteHRInterview = () => '/hr-interview';
export const getRouteHRInterviewQueue = () => '/hr-interview-queue';
export const getRouteHRInterviewEditor = () => '/hr-interview-editor';

export const getRouteHRInterviewAnswerEdit = (id: string) =>
    `/hr-interview-qa/${id}/edit`;

export const getRouteLiveCodeTasks = () => '/live-code-tasks';
export const getRouteLiveCodeTaskCreate = () => '/live-code-task/new';
export const getRouteLiveCodeTaskEdit = (id: string) =>
    `/live-code-task/${id}/edit`;
export const getRouteLiveCodeTaskDetails = (id: string) =>
    `/live-code-task/${id}`;

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteSettings()]: AppRoutes.SETTINGS,
    [getRouteProfile(':id')]: AppRoutes.PROFILE,
    [getRouteArticles()]: AppRoutes.ARTICLES,
    [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
    [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
    [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
    [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
    [getRouteMyArticles()]: AppRoutes.MY_ARTICLES,
    [getRouteUsefulLinks()]: AppRoutes.USEFUL_LINKS,
    [getRouteEnglish()]: AppRoutes.ENGLISH,
    [getRouteHRInterviewQACreate()]: AppRoutes.HR_INTERVIEW_CREATE,
    [getRouteHRInterview()]: AppRoutes.HR_INTERVIEW,
    [getRouteHRInterviewEditor()]: AppRoutes.HR_INTERVIEW_EDITOR,
    [getRouteHRInterviewQueue()]: AppRoutes.HR_INTERVIEW_QUEUE,
    [getRouteHRInterviewAnswerEdit(':id')]: AppRoutes.HR_INTERVIEW_ANSWER_EDIT,
    [getRouteLiveCodeTasks()]: AppRoutes.LIVE_CODE_TASKS,
    [getRouteLiveCodeTaskEdit(':id')]: AppRoutes.LIVE_CODE_TASK_EDIT,
    [getRouteLiveCodeTaskCreate()]: AppRoutes.LIVE_CODE_TASK_CREATE,
};

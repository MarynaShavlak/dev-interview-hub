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
export const getRouteHRInterviewQACreate = () => '/hr-interview-qa/new';

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
};

export enum ArticleSortField {
    VIEWS_ASC = 'articles_views_asc',
    TITLE_ASC = 'articles_title_asc',
    CREATED_ASC = 'articles_createdAt_asc',
    VIEWS_DESC = 'articles_views_desc',
    TITLE_DESC = 'articles_title_desc',
    CREATED_DESC = 'articles_createdAt_desc',
}

export enum ArticleCategory {
    ALL = 'ALL',
    IT = 'IT',
    CSS = 'CSS',
    HTML = 'HTML',
    REACT = 'React',
    JAVASCRIPT = 'JavaScript',
    TYPESCRIPT = 'TypeScript',
    GIT = 'Git',
    SEO = 'SEO',
    ACCESSIBILITY = 'Accessibility',
    PERFORMANCE = 'Performance',
    REDUX = 'Redux',
}

export enum ArticleView {
    LIST = 'LIST',
    GRID = 'GRID',
    SEQUENCE = 'SEQUENCE',
}

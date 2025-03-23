import { Article } from '../../../src/entities/Article';

export const searchArticles = (searchValue: string) => {
    cy.getByTestId('ArticlesPage.SearchInput').clear();
    cy.getByTestId('ArticlesPage.SearchInput').type(searchValue);

    cy.getByTestId('ArticlesPage.SearchInput').should(
        'have.value',
        searchValue,
    );
};

export const filterArticlesByCategory = (category: string) => {
    return cy
        .callFirestore('get', 'articles', {
            where: [['category', 'array-contains', category]],
        })
        .then((result) => {
            return result;
        });
};
export const sortArticlesByViews = (order: 'asc' | 'desc') => {
    return cy
        .callFirestore('get', 'articles', {
            orderBy: ['views', order],
        })
        .then((articles) => {
            console.log(`articles sorted by views (${order})`, articles);
            return articles;
        });
};

declare global {
    namespace Cypress {
        interface Chainable {
            searchArticles(searchValue: string): Chainable<Article[]>;
            filterArticlesByCategory(category: string): Chainable<Article[]>;
            sortArticlesByViews(order: 'asc' | 'desc'): Chainable<Article[]>;
        }
    }
}

import { Article } from '../../../src/entities/Article';

export const searchArticles = (searchValue: string) => {
    cy.getByTestId('ArticlesPage.SearchInput').clear().type(searchValue);
};

export const filterArticlesByCategory = (category: string) => {
    const queryString = `_expand=user&_limit=9&_page=1&_sort=createdAt&_order=asc&category=${category}`;
    const url = `http://localhost:8000/articles?${queryString}`;
    return cy
        .request({
            method: 'GET',
            url,
            headers: { Authorization: 'asasf' },
        })
        .then((response) => {
            return response.body;
        });
};

declare global {
    namespace Cypress {
        interface Chainable {
            searchArticles(searchValue: string): Chainable<Article[]>;
            filterArticlesByCategory(category: string): Chainable<Article[]>;
        }
    }
}

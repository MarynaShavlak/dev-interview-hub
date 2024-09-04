let articleId = '';

describe('User visits the articles list page', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            cy.createArticle().then((article) => {
                articleId = article.id;
                cy.visit('articles');
            });
        });
    });

    afterEach(() => {
        cy.removeArticle(articleId);
    });

    it('and the articles load successfully', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 1);
    });

    it('and search articles', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.searchArticles('TESTING ARTICLE');
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length', 1);
    });
});

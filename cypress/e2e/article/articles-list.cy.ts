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

    it('and searches articles', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.searchArticles('TESTING ARTICLE');
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length', 1);
        cy.getByTestId('ArticleListItem.Title.Header').contains(
            'TESTING ARTICLE',
        );
    });

    it('and filters articles by category ', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.filterArticlesByCategory('SOCIOLOGY').then((articles) => {
            expect(articles.length).to.be.greaterThan(0);
            articles.forEach((article) => {
                expect(article.category).contains('SOCIOLOGY');
            });
        });
    });
});

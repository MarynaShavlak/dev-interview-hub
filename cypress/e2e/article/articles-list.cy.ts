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
        cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
        cy.searchArticles('TESTING ARTICLE');
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleList').should('have.length', 1);
        cy.getByTestId('ArticleListItem.Title.Header').contains(
            'TESTING ARTICLE',
        );
    });

    it('and filters articles by category ', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
        cy.filterArticlesByCategory('CSS').then((articles) => {
            expect(articles.length).to.be.greaterThan(0);
            articles.forEach((article) => {
                expect(article.category).contains('CSS');
            });
        });
    });

    it('and sorts articles by views in ascending order', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
        cy.sortArticlesByViews('asc').then((articles) => {
            expect(articles.length).to.be.greaterThan(0);
            let previousViews = -1;
            articles.forEach((article) => {
                expect(article.views).to.be.at.least(previousViews);
                previousViews = article.views;
            });
        });
    });

    it('and sorts articles by views in descending order', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
        cy.sortArticlesByViews('desc').then((articles) => {
            expect(articles.length).to.be.greaterThan(0);
            let previousViews = Infinity;
            articles.forEach((article) => {
                expect(article.views).to.be.at.most(previousViews);
                previousViews = article.views;
            });
        });
    });
});

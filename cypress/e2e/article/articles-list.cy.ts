import { testArticle } from '../../data/articleData';

let articleId = '';

describe('User visits the articles list page', () => {
    beforeEach(() => {
        cy.loginUser();

        cy.callFirestore('add', 'articles', testArticle).then((docRef) => {
            console.log('docRef:', docRef);
            articleId = docRef.id || docRef._path.segments[1];
        });
        cy.visit('/articles');
    });

    afterEach(() => {
        if (articleId) {
            cy.callFirestore('delete', `articles/${articleId}`);
        }
        cy.logoutUser();
    });

    it('and the articles load successfully', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 1);
    });

    it('and searches articles', () => {
        cy.searchArticles('TESTING ARTICLE');

        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleList').should('have.length', 1);
        cy.getByTestId('ArticleListItem.Title.Paragraph').contains(
            'TESTING ARTICLE',
        );
    });
    it('and filters articles by category ', () => {
        cy.filterArticlesByCategory('CSS').then((articles) => {
            expect(articles.length).to.be.at.least(1);
        });
    });
    it('and sorts articles by views in ascending order', () => {
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

let currentArticleId = '';

describe('User visits the article page', () => {
    beforeEach(() => {
        cy.login();

        cy.createArticle().then((article) => {
            console.log('article', article);
            currentArticleId = article.id;
            console.log('current article id', currentArticleId);
            cy.visit(`article/${article.id}`);
        });
    });

    afterEach(() => {
        cy.removeArticle(currentArticleId);
    });

    it('And sees the article content', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
        cy.getByTestId('ArticleDetails.Title.Header').contains(
            'TESTING ARTICLE',
        );
        cy.getByTestId('ArticleDetails.CreatedAt.Paragraph').contains(
            '12.03.2025',
        );
        cy.getByTestId('ArticleDetails.ArticleImage')
            .should('have.attr', 'src')
            .and(
                'include',
                'https://miro.medium.com/v2/resize:fit:1400/0*5KGuaB1kovyV4EbV.png',
            );
        cy.getByTestId('ArticleDetails.Views.Paragraph').contains(1022);
    });

    it('And sees the recommendations list', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });

    it('And leaves a comment', () => {
        cy.intercept('GET', '**/article/*', (req) => {
            req.reply({
                statusCode: 200,
                fixture: 'article-details.json',
            });
        });
        cy.getByTestId('AddCommentForm').scrollIntoView();
        cy.addComment('text of the comment');
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });
});

// it('And leaves a comment', () => {
//     cy.intercept('GET', '**/articles/*', {
//         fixture: 'article-details.json',
//     });
//     cy.getByTestId('AddCommentForm').scrollIntoView();
//     cy.addComment('text of the comment');
//     cy.getByTestId('CommentCard.Content').should('have.length', 1);
// });
//
// it('And rates the article', () => {
//     cy.intercept('GET', '**/articles/*', {
//         fixture: 'article-details.json',
//     });
//     cy.getByTestId('RatingCard').scrollIntoView();
//     cy.setRate(4, 'feedback');
//     cy.get('[data-selected=true]').should('have.length', 4);
// });

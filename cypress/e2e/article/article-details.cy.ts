import { testArticle } from '../../data/articleData';

let currentArticleId = '';
let commentText = '';
let feedbackText = '';

describe('User visits the article page', () => {
    beforeEach(() => {
        cy.loginUser();
        cy.callFirestore('add', 'articles', testArticle).then((docRef) => {
            console.log('docRef:', docRef);
            currentArticleId = docRef.id || docRef._path.segments[1];
            cy.visit(`article/${currentArticleId}`);
        });

        // cy.createArticle().then((article) => {
        //
        //     currentArticleId = article.id;
        //     cy.visit(`article/${article.id}`);
        // });
    });

    afterEach(() => {
        if (currentArticleId) {
            cy.callFirestore('delete', `articles/${currentArticleId}`);
        }

        // cy.removeArticle(currentArticleId);
        if (commentText) {
            cy.removeComment(commentText);
            commentText = '';
        }
        if (feedbackText) {
            cy.removeRating(feedbackText);
            feedbackText = '';
        }
        cy.logoutUser();
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
    });

    it('And sees the recommendations list', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });

    // it('And leaves a comment', () => {
    //     cy.intercept('GET', '**/article/*', (req) => {
    //         req.reply({
    //             statusCode: 200,
    //             fixture: 'article-details.json',
    //         });
    //     });
    //     cy.getByTestId('AddCommentForm').scrollIntoView();
    //     commentText = 'test cypress text of the comment';
    //     cy.addComment(commentText);
    //     cy.getByTestId('CommentCard.Content').should('have.length', 1);
    // });
    //
    // it('And rates the article', () => {
    //     cy.intercept('GET', '**/article/*', (req) => {
    //         req.reply({
    //             statusCode: 200,
    //             fixture: 'article-details.json',
    //         });
    //     });
    //     cy.getByTestId('RatingCard').scrollIntoView();
    //     feedbackText = 'test cypress feedback text';
    //     cy.setRate(4, feedbackText);
    //     cy.get('[data-selected=true]').should('have.length', 4);
    // });
});

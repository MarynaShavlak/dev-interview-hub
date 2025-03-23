import { testArticle } from '../../data/articleData';

let currentArticleId = '';
let feedbackText = '';
let articleDocId = '';
let commentDocId = '';
let ratingDocId = '';

describe('User visits the article page', () => {
    beforeEach(() => {
        cy.loginUser();
        cy.callFirestore('add', 'articles', testArticle).then((docRef) => {
            currentArticleId = testArticle.id;
            articleDocId = docRef.id || docRef._path.segments[1];
            cy.visit(`article/${currentArticleId}`);
        });
    });

    afterEach(() => {
        if (articleDocId) {
            cy.callFirestore('delete', `articles/${articleDocId}`);
        }
        if (commentDocId) {
            cy.callFirestore('delete', `comments/${commentDocId}`);
            commentDocId = '';
        }

        if (ratingDocId) {
            cy.callFirestore('delete', `ratings/${ratingDocId}`);
            ratingDocId = '';
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
    it('And leaves a comment', () => {
        cy.intercept('GET', '**/article/*', (req) => {
            req.reply({
                statusCode: 200,
                fixture: 'article-details.json',
            });
        });
        cy.getByTestId('AddCommentForm').scrollIntoView();

        cy.addComment('test cypress text of the comment').then((docId) => {
            commentDocId = docId || '';
        });
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });
    it('And rates the article', () => {
        cy.intercept('GET', '**/article/*', (req) => {
            req.reply({
                statusCode: 200,
                fixture: 'article-details.json',
            });
        });
        cy.getByTestId('RatingCard').scrollIntoView();
        feedbackText = 'test cypress feedback text';
        cy.setRate(4, feedbackText).then((docId) => {
            ratingDocId = docId || '';
        });
        cy.get('[data-selected=true]').should('have.length', 4);
    });
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

import { removeRatingFromFirestore } from '../../helpers/removeRatingFromFirestore';

export const setRate = (starsCount = 5, feedback = 'feedback') => {
    console.log('ffff', feedback);
    cy.getByTestId(`StarRating-${starsCount}`).click();
    cy.getByTestId('feedback-input').type(feedback);
    cy.getByTestId('feedback-input').should('have.value', feedback);
    cy.getByTestId('submit-feedback-btn').click();
};

export const removeRating = (feedback: string) => {
    return cy.wrap(null).then(() => {
        return removeRatingFromFirestore(feedback).catch((error) => {
            throw new Error(error.message);
        });
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            setRate(starsCount: number, feedback: string): Chainable<void>;
            removeRating(feedback: string): Chainable<void>;
        }
    }
}

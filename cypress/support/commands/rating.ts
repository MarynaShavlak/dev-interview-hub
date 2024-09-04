export const setRate = (starsCount = 5, feedback = 'feedback') => {
    cy.getByTestId(`StarRating-${starsCount}`).click();
    cy.getByTestId('feedback-input').type(feedback);
    cy.getByTestId('submit-feedback-btn').click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            setRate(starsCount: number, feedback: string): Chainable<void>;
        }
    }
}

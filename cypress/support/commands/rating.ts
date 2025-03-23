export const setRate = (starsCount = 5, feedback = 'feedback') => {
    cy.getByTestId(`StarRating-${starsCount}`).click();
    cy.getByTestId('feedback-input').type(feedback);
    cy.getByTestId('feedback-input').should('have.value', feedback);
    cy.getByTestId('submit-feedback-btn').click();

    return cy
        .callFirestore('get', 'ratings', {
            where: ['feedback', '==', feedback],
            limit: 1,
        })
        .then((ratings) => {
            console.log('ratings', ratings);
            if (ratings && ratings.length > 0) {
                return ratings[0].id;
            }
            return null;
        });
};

declare global {
    namespace Cypress {
        interface Chainable {
            setRate(
                starsCount: number,
                feedback: string,
            ): Chainable<string | null>;
        }
    }
}

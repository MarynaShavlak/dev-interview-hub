export const addComment = (text: string) => {
    cy.getByTestId('AddCommentForm.Input').type(text);
    cy.getByTestId('AddCommentForm.Button').click();

    return cy
        .callFirestore('get', 'comments', {
            where: ['text', '==', text],
            limit: 1,
        })
        .then((comments) => {
            console.log('comments', comments);
            if (comments && comments.length > 0) {
                return comments[0].id;
            }
            return null;
        });
};

declare global {
    namespace Cypress {
        interface Chainable {
            addComment(text: string): Chainable<string | null>;
        }
    }
}

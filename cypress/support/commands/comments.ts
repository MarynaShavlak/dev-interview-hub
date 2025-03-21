import { removeCommentFromFirestore } from '../../helpers/removeCommentFromFirestore';

export const addComment = (text: string) => {
    cy.getByTestId('AddCommentForm.Input').type(text);
    cy.getByTestId('AddCommentForm.Button').click();
};

export const removeComment = (commentText: string) => {
    return cy.wrap(null).then(() => {
        return removeCommentFromFirestore(commentText).catch((error) => {
            throw new Error(error.message);
        });
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            addComment(text: string): Chainable<void>;
            removeComment(commentId: string): Chainable<void>;
        }
    }
}

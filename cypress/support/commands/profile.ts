import { User } from '../../../src/entities/User';

export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('EditableProfileCardHeader.EditButton').click();
    cy.getByTestId('UserCard.firstname').clear().type(firstname);
    cy.getByTestId('UserCard.lastname').clear().type(lastname);
    cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const getProfileDocId = (profileId: string) => {
    return cy.callFirestore('get', 'users').then((docs) => {
        const matchingDoc = docs.find(
            // @ts-ignore
            (doc) => doc.id && doc.id === profileId,
        );
        return matchingDoc ? matchingDoc.__id : null;
    });
};

export const getProfile = (profileId: string) => {
    return cy
        .callFirestore('get', 'users', {
            where: ['id', '==', profileId],
            limit: 1,
        })
        .then((users) => {
            console.log('users', users);
            if (users && users.length > 0) {
                console.log('users', users[0]);
                return users[0];
            }
            return null;
        });
};

export const resetProfile = (profileDocId: string, initialUser: User) => {
    if (!profileDocId) {
        throw new Error('profileDocId is required to reset profile');
    }
    if (!initialUser) {
        throw new Error('initialUser data is required to reset profile');
    }
    console.log('initialUser', initialUser);

    // Use callFirestore to update the document
    return cy.callFirestore(
        'update',
        `users/${profileDocId}`, // Document path
        initialUser, // Data to reset to
    );
    // .then(() => {
    //     // Verify the update was successful by fetching the profile
    //     return cy
    //         .callFirestore('get', `users/${profileId}`)
    //         .then((updatedDoc) => {
    //             return updatedDoc; // Return the updated document
    //         });
    // });
};

declare global {
    namespace Cypress {
        interface Chainable {
            getProfile(profileId: string): Chainable<User>;
            getProfileDocId(profileId: string): Chainable<string | null>;
            updateProfile(firstname: string, lastname: string): Chainable<void>;
            resetProfile(
                profileDocId: string,
                initialUser: User,
            ): Chainable<void>;
        }
    }
}

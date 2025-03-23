import { User } from '../../../src/entities/User';
import { resetUserProfileInFirestore } from '../../helpers/resetUserProfileInFirestore';

export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('EditableProfileCardHeader.EditButton').click();
    cy.getByTestId('UserCard.firstname').clear().type(firstname);
    cy.getByTestId('UserCard.lastname').clear().type(lastname);
    cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

// export const resetProfile = (profileId: string) => {
//     return cy.request({
//         method: 'PUT',
//         url: `${Cypress.env('apiUrl')}/profile/${profileId}`,
//         headers: { Authorization: 'asasf' },
//         body: {
//             id: '4',
//             firstname: 'test',
//             lastname: 'user',
//             age: '25',
//             currency: 'EUR',
//             country: 'Ukraine',
//             city: 'Kharkiv',
//             username: 'testuser',
//             // eslint-disable-next-line max-len
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//     });
// };

export const resetProfile = (profileId: string) => {
    const defaultProfileData: Partial<User> = {
        id: profileId,
        firstname: 'Maryna',
        lastname: 'Shavlak',
        age: '30',
        city: 'Kharkiv',
        username: 'marynashavlak',
    };
    return cy.wrap(null).then(() => {
        return resetUserProfileInFirestore(profileId, defaultProfileData)
            .then((resetData) => resetData)
            .catch((error) => {
                throw new Error(error.message);
            });
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}

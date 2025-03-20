import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore';
import { firestore } from '../../../json-server/firebase';
import { User } from '../../../src/entities/User';

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
        firstname: 'Andrii',
        lastname: 'Shavlak',
        age: '56',
        city: 'Kharkiv',
        username: 'andrii_shavlak',
    };

    return cy.wrap(null).then(async () => {
        try {
            // Query to find the document where 'id' field matches profileId
            const usersRef = collection(firestore, 'users');
            const q = query(usersRef, where('id', '==', profileId));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error(`No user found with id: ${profileId}`);
            }

            const userDoc = querySnapshot.docs[0];
            const userRef = doc(firestore, 'users', userDoc.id);

            await setDoc(userRef, defaultProfileData, { merge: false });

            return defaultProfileData;
        } catch (error) {
            throw new Error(`Failed to reset profile in Firestore: ${error}`);
        }
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

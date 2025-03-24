import { User } from '../../../src/entities/User';

let profileId = '';
let profileDocId = '';
let initialProfileData = {};

describe('User visits the profile page', () => {
    beforeEach(() => {
        cy.visit('');
        cy.logoutUser();
        cy.loginUser().then((user) => {
            profileId = user.uid;
            cy.getProfileDocId(profileId).then((docId) => {
                if (docId) {
                    profileDocId = docId;
                }
            });
            cy.getProfile(profileId).then((profile) => {
                if (profile) {
                    initialProfileData = profile;
                }
            });
            cy.visit(`profile/${profileId}`);
        });
    });

    afterEach(() => {
        if (profileDocId && initialProfileData) {
            console.log('profileDocId', profileDocId);
            cy.resetProfile(profileDocId, initialProfileData as User);
        }
    });

    it('And the profile loads successfully', () => {
        cy.getByTestId('UserCard.firstname').should(
            'have.value',
            'app_testuser_firstname',
        );
        cy.getByTestId('UserCard.lastname').should(
            'have.value',
            'app_testuser_lastname',
        );
        cy.getByTestId('UserCard.username').should(
            'have.value',
            'apptestuser_username',
        );
        cy.getByTestId('UserCard.age').should('have.value', '30');
        cy.getByTestId('UserCard.city').should('have.value', 'Kharkiv');
    });

    it('And edits the profile', () => {
        const newName = 'new firstname';
        const newLastname = 'new lastname';
        cy.updateProfile(newName, newLastname);
        cy.getByTestId('UserCard.firstname').should('have.value', newName);
        cy.getByTestId('UserCard.lastname').should('have.value', newLastname);
    });
});

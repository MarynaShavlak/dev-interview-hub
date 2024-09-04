export const searchArticles = (searchValue: string) => {
    cy.getByTestId('ArticlesPage.SearchInput').clear().type(searchValue);
};
declare global {
    namespace Cypress {
        interface Chainable {
            searchArticles(searchValue: string): Chainable<void>;
        }
    }
}

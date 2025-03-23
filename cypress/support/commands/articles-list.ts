import { Article } from '../../../src/entities/Article';

export const searchArticles = (searchValue: string) => {
    // Query the input, clear it, and type separately
    cy.getByTestId('ArticlesPage.SearchInput').clear();
    cy.getByTestId('ArticlesPage.SearchInput').type(searchValue);
    // Ensure the input retains the value after typing
    cy.getByTestId('ArticlesPage.SearchInput').should(
        'have.value',
        searchValue,
    );
};

// export const filterArticlesByCategory = (category: string) => {
//     const queryString = `sort=createdAt&order=asc&query=&category=${category}`;
//     const url = `${Cypress.env('apiUrl')}/articles?${queryString}`;
//     return cy
//         .request({
//             method: 'GET',
//             url,
//             headers: { Authorization: 'asasf' },
//         })
//         .then((response) => {
//             return response.body;
//         });
// };

// export const filterArticlesByCategory = (category: string) => {
//     return cy.wrap(null).then(async () => {
//         try {
//             // Create a reference to the 'articles' collection
//             const articlesRef = collection(firestore, 'articles');
//
//             // Build a query to filter articles by category
//             const q = query(
//                 articlesRef,
//                 where('category', 'array-contains', category),
//             );
//
//             // Execute the query
//             const querySnapshot = await getDocs(q);
//
//             // Map the results to an array of Article objects
//             const articles: Article[] = querySnapshot.docs.map((doc) => ({
//                 id: doc.id, // Firestore document ID
//                 ...doc.data(),
//             })) as Article[];
//
//             return articles;
//         } catch (error) {
//             throw new Error(
//                 `Failed to filter articles by category in Firestore: ${error}`,
//             );
//         }
//     });
// };

// export const filterArticlesByCategory = (category: string) => {
//     // Construct the URL query string as in the original
//     const queryString = `sort=createdAt&order=asc&query=&category=${category}`;
//
//     return cy.wrap(null).then(async () => {
//         try {
//             // Parse the query string manually (or use a library like 'query-string')
//             const params = new URLSearchParams(queryString);
//             const sortField = params.get('sort') || 'createdAt';
//             const sortOrder = params.get('order') === 'desc' ? 'desc' : 'asc';
//             const filterCategory = params.get('category');
//
//             // Create a reference to the 'articles' collection
//             const articlesRef = collection(firestore, 'articles');
//
//             // Build the Firestore query
//             let q = query(articlesRef);
//             if (filterCategory) {
//                 q = query(
//                     q,
//                     where('category', 'array-contains', filterCategory),
//                 );
//             }
//             q = query(q, orderBy(sortField, sortOrder));
//
//             // Execute the query
//             const querySnapshot = await getDocs(q);
//
//             // Map results to Article array
//             const articles: Article[] = querySnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             })) as Article[];
//
//             return articles;
//         } catch (error) {
//             throw new Error(
//                 `Failed to filter articles by category in Firestore: ${error}`,
//             );
//         }
//     });
// };

export const sortArticlesByViews = (order: string) => {
    const queryString = `_expand=user&_limit=9&_page=1&_sort=views&_order=${order}`;
    const url = `${Cypress.env('apiUrl')}/articles?${queryString}`;
    return cy
        .request({
            method: 'GET',
            url,
            headers: { Authorization: 'asasf' },
        })
        .then((response) => {
            return response.body;
        });
};

declare global {
    namespace Cypress {
        interface Chainable {
            searchArticles(searchValue: string): Chainable<Article[]>;
            filterArticlesByCategory(category: string): Chainable<Article[]>;
            sortArticlesByViews(order: string): Chainable<Article[]>;
        }
    }
}

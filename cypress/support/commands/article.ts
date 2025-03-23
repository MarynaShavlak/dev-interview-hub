import { addDoc, collection } from 'firebase/firestore';
import { Article } from '../../../src/entities/Article';
import { firestore } from '../../../json-server/firebase';
import { testArticle } from '../../data/articleData';

export const createArticle = (article?: Article) => {
    return cy.wrap(null).then(() => {
        const articleData = article ?? testArticle;

        return addDoc(collection(firestore, 'articles'), articleData)
            .then((docRef) => {
                return articleData as Article;
            })
            .catch((error) => {
                throw new Error(
                    `Failed to create article in Firestore: ${error.message}`,
                );
            });
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>;
        }
    }
}

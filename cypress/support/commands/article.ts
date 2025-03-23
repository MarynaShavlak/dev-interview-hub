import { addDoc, collection } from 'firebase/firestore';
import { v4 } from 'uuid';
import { Article } from '../../../src/entities/Article';
import { firestore } from '../../../json-server/firebase';
import { removeArticleFromFirestore } from '../../helpers/removeArticleFromFirestore';

const user = {
    email: 'testemail@gmail.com',
    firstname: 'testuser firtstname',
    lastname: 'testuser lastname',
    id: '123',
    username: 'testUsername',
    avatar: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
    age: '30',
    city: 'Kharkiv',

    roles: ['ADMIN'],
    features: {
        isArticleRatingEnabled: true,
        isAppRedesigned: true,
    },
    jsonSettings: {
        theme: 'app_light_theme',
        isFirstVisit: true,
        settingsPageHasBeenOpen: false,
        isArticlesPageWasOpened: false,
    },
};

export const defaultArticle = {
    title: 'TESTING ARTICLE',
    subtitle: {
        text: 'Test subtitle',
    },
    img: 'https://miro.medium.com/v2/resize:fit:1400/0*5KGuaB1kovyV4EbV.png',
    views: 1022,
    createdAt: '2025-03-12T17:20:33.872Z',
    user,
    category: ['IT'],
    blocks: [],
    id: v4(),
};

export const createArticle = (article?: Article) => {
    return cy.wrap(null).then(() => {
        const articleData = article ?? defaultArticle;

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

export const removeArticle = (articleId: string) => {
    return cy.wrap(null).then(() => {
        return removeArticleFromFirestore(articleId).catch((error) => {
            throw new Error(error.message);
        });
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>;
            removeArticle(articleId: string): Chainable<void>;
        }
    }
}

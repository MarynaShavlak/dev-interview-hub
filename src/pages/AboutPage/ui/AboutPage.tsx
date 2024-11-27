import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

// const users = [
//     {
//         id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//         username: 'mainAdmin',
//         firstname: 'Maryna',
//         lastname: 'Shavlak',
//         age: '30',
//         currency: Currency.EUR,
//         country: Country.Ukraine,
//         city: 'Kharkiv',
//         email: 'mainAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             theme: Theme.ORANGE,
//             isFirstVisit: true,
//             settingsPageHasBeenOpen: false,
//             isArticlesPageWasOpened: true,
//         },
//         avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//     },
//     {
//         id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//         username: 'mainUser',
//         firstname: 'Tetiana',
//         lastname: 'Shavlak',
//         age: '54',
//         currency: Currency.UAH,
//         country: Country.Ukraine,
//         city: 'Kyiv',
//         email: 'mainUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//     },
//     {
//         id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//         username: 'mainManager',
//         firstname: 'Maxim',
//         lastname: 'Shavlak',
//         age: '27',
//         currency: Currency.EUR,
//         country: Country.Ukraine,
//         city: 'Kyiv',
//         email: 'mainManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//     },
//     {
//         id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//         username: 'testuser',
//         firstname: 'Test',
//         lastname: UserRole.USER,
//         age: '45',
//         currency: Currency.EUR,
//         country: Country.Ukraine,
//         city: 'Kharkiv',
//         email: 'testuser@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//     },
//     {
//         id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//         username: 'testuser2',
//         firstname: 'Test2',
//         lastname: 'User2',
//         age: '25',
//         currency: Currency.EUR,
//         country: Country.Ukraine,
//         city: 'Kharkiv',
//         email: 'testuser2@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://example.com/avatar6.png',
//     },
//     {
//         id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
//         username: 'markUser',
//         firstname: 'Mark',
//         lastname: 'Smith',
//         age: '28',
//         currency: Currency.USD,
//         country: Country.Poland,
//         city: 'Warsaw',
//         email: 'markUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: false,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar6.png',
//     },
//     {
//         id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
//         username: 'katyaAdmin',
//         firstname: 'Katya',
//         lastname: 'Ivanova',
//         age: '35',
//         currency: Currency.UAH,
//         country: Country.Ukraine,
//         city: 'Lviv',
//         email: 'katyaAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.DARK,
//         },
//         avatar: 'https://example.com/avatar7.jpg',
//     },
//     {
//         id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
//         username: 'johnManager',
//         firstname: 'John',
//         lastname: 'Doe',
//         age: '40',
//         currency: Currency.USD,
//         country: Country.Ireland,
//         city: 'Dublin',
//         email: 'johnManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar8.jpg',
//     },
//     {
//         id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
//         username: 'annaUser',
//         firstname: 'Anna',
//         lastname: 'Koval',
//         age: '22',
//         currency: Currency.EUR,
//         country: Country.Germany,
//         city: 'Berlin',
//         email: 'annaUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://example.com/avatar9.jpg',
//     },
//     {
//         id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
//         username: 'lucyAdmin',
//         firstname: 'Lucy',
//         lastname: 'Brown',
//         age: '30',
//         currency: Currency.EUR,
//         country: Country.Poland,
//         city: 'Krakow',
//         email: 'lucyAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar10.jpg',
//     },
//     {
//         id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
//         username: 'alexManager',
//         firstname: 'Alex',
//         lastname: 'Johnson',
//         age: '37',
//         currency: Currency.USD,
//         country: Country.Croatia,
//         city: 'Zagreb',
//         email: 'alexManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: false,
//             theme: Theme.DARK,
//         },
//         avatar: 'https://example.com/avatar11.jpg',
//     },
//     {
//         id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
//         username: 'leoUser',
//         firstname: 'Leo',
//         lastname: 'Mikhailov',
//         age: '29',
//         currency: Currency.UAH,
//         country: Country.Ukraine,
//         city: 'Odessa',
//         email: 'leoUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://example.com/avatar12.jpg',
//     },
//     {
//         id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
//         username: 'janeAdmin',
//         firstname: 'Jane',
//         lastname: 'Williams',
//         age: '33',
//         currency: Currency.USD,
//         country: Country.Ireland,
//         city: 'Cork',
//         email: 'janeAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.DARK,
//         },
//         avatar: 'https://example.com/avatar13.jpg',
//     },
//     {
//         id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
//         username: 'peterManager',
//         firstname: 'Peter',
//         lastname: 'Muller',
//         age: '42',
//         currency: Currency.EUR,
//         country: Country.Germany,
//         city: 'Hamburg',
//         email: 'peterManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar14.jpg',
//     },
//     {
//         id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
//         username: 'mariaUser',
//         firstname: 'Maria',
//         lastname: 'Petrova',
//         age: '27',
//         currency: Currency.UAH,
//         country: Country.Ukraine,
//         city: 'Kyiv',
//         email: 'mariaUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://example.com/avatar15.jpg',
//     },
//     {
//         id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
//         username: 'maxAdmin',
//         firstname: 'Max',
//         lastname: 'Gordon',
//         age: '38',
//         currency: Currency.EUR,
//         country: Country.Poland,
//         city: 'Poznan',
//         email: 'maxAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.DARK,
//         },
//         avatar: 'https://example.com/avatar16.jpg',
//     },
//     {
//         id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
//         username: 'nickManager',
//         firstname: 'Nick',
//         lastname: 'Garcia',
//         age: '41',
//         currency: Currency.USD,
//         country: Country.Croatia,
//         city: 'Split',
//         email: 'nickManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar17.jpg',
//     },
//     {
//         id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
//         username: 'claraUser',
//         firstname: 'Clara',
//         lastname: 'Santos',
//         age: '32',
//         currency: Currency.EUR,
//         country: Country.Germany,
//         city: 'Munich',
//         email: 'claraUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://example.com/avatar18.jpg',
//     },
//     {
//         id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
//         username: 'tomAdmin',
//         firstname: 'Tom',
//         lastname: 'Anderson',
//         age: '36',
//         currency: Currency.USD,
//         country: Country.Ireland,
//         city: 'Galway',
//         email: 'tomAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.DARK,
//         },
//         avatar: 'https://example.com/avatar19.jpg',
//     },
//     {
//         id: 'qkcVyIbnjYeEbaYVKGhtZrny7GC3',
//         username: 'sarahManager',
//         firstname: 'Sarah',
//         lastname: 'Cooper',
//         age: '39',
//         currency: Currency.EUR,
//         country: Country.Croatia,
//         city: 'Rijeka',
//         email: 'sarahManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar20.jpg',
//     },
//     {
//         id: 'V4wTjlJxpYdllrdmfIaprloLcrG3',
//         username: 'danielUser',
//         firstname: 'Daniel',
//         lastname: 'Adams',
//         age: '29',
//         currency: Currency.USD,
//         country: Country.USA,
//         city: 'New York',
//         email: 'danielUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: false,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar21.jpg',
//     },
//     {
//         id: 'lfhMI4VQqLZZmVv3fPq0yT27NLQ2',
//         username: 'victorAdmin',
//         firstname: 'Victor',
//         lastname: 'Johnson',
//         age: '42',
//         currency: Currency.EUR,
//         country: Country.England,
//         city: 'London',
//         email: 'victorAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://example.com/avatar22.jpg',
//     },
//     {
//         id: 'KHODlvsuABMwBACybNV9FIIO07k1',
//         username: 'olgaManager',
//         firstname: 'Olga',
//         lastname: 'Ivanova',
//         age: '37',
//         currency: Currency.EUR,
//         country: Country.Germany,
//         city: 'Frankfurt',
//         email: 'olgaManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar23.jpg',
//     },
//     {
//         id: 'Hrsg32Jr4uQS7P4HusvSAQ7R8Zt2',
//         username: 'emmaUser',
//         firstname: 'Emma',
//         lastname: 'Anderson',
//         age: '26',
//         currency: Currency.USD,
//         country: Country.Canada,
//         city: 'Toronto',
//         email: 'emmaUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://example.com/avatar24.jpg',
//     },
//     {
//         id: 'hWB4U7cCG1VHNBWX8i7OQ0qqD0o2',
//         username: 'jasonAdmin',
//         firstname: 'Jason',
//         lastname: 'Gordon',
//         age: '45',
//         currency: Currency.USD,
//         country: Country.USA,
//         city: 'Los Angeles',
//         email: 'jasonAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.DARK,
//         },
//         avatar: 'https://example.com/avatar25.jpg',
//     },
//     {
//         id: 'bH4QePW3zDOYqHch98cXBLlpYK52',
//         username: 'lindaManager',
//         firstname: 'Linda',
//         lastname: 'Muller',
//         age: '33',
//         currency: Currency.EUR,
//         country: Country.Austria,
//         city: 'Vienna',
//         email: 'lindaManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar26.jpg',
//     },
//     {
//         id: 'jkoqxfXfRKUBgGQrvyL8J3QDDVm2',
//         username: 'henryUser',
//         firstname: 'Henry',
//         lastname: 'Williams',
//         age: '31',
//         currency: Currency.USD,
//         country: Country.USA,
//         city: 'San Francisco',
//         email: 'henryUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: false,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar27.jpg',
//     },
// ];
// const usersCollection = collection(firestore, 'users');
//
// async function uploadUsers(users: User[]) {
//     try {
//         // @ts-ignore
//         const promises = [];
//         users.forEach((user) => {
//             const userDoc = doc(usersCollection);
//             promises.push(setDoc(userDoc, user));
//         });
//
//         // @ts-ignore
//         await Promise.all(promises); // Wait for all uploads to complete
//         console.log('Articles uploaded successfully!');
//     } catch (error) {
//         console.error('Error uploading articles:', error);
//     }
// }
const AboutPage = memo(() => {
    const { t } = useTranslation('about');
    // uploadUsers(users);
    return <Page data-testid="AboutPage">{t('Про сайт')}</Page>;
});

export default AboutPage;

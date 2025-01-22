// import {
//     ArticlesByUserData,
//     UserPartial,
//     UserArticlesTableInfo,
// } from '../../../../model/types/userArticlesTableInfo';
//
// export const getCombinedUsersData = (
//     users: UserPartial[],
//
//     articlesByUserData: ArticlesByUserData,
// ): UserArticlesTableInfo[] => {
//     return users.map((user) => {
//         const articlesQuantity = articlesByUserData[user.id] || 0;
//         const {
//             id,
//             role,
//             username,
//             email,
//             features,
//             age,
//             city,
//             country,
//             currency,
//             avatar,
//             lastname,
//             firstname,
//         } = user;
//
//         return {
//             id,
//             avatar,
//             username,
//             email,
//             lastname,
//             firstname,
//             role,
//             age,
//             country,
//             city,
//             currency,
//             features,
//             articlesQuantity,
//         };
//     });
// };
export {};

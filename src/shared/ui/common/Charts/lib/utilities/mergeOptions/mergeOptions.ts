// export const mergeOptions = (
//     baseOptions: ApexCharts.ApexOptions,
//     overrides: ApexCharts.ApexOptions,
// ): ApexCharts.ApexOptions => {
//     const merged = { ...baseOptions };
//
//     Object.keys(overrides).forEach((key) => {
//         if (
//             typeof overrides[key] === 'object' &&
//             !Array.isArray(overrides[key])
//         ) {
//             merged[key] = { ...baseOptions[key], ...overrides[key] };
//         } else {
//             merged[key] = overrides[key];
//         }
//     });
//
//     return merged;
// };
// import ApexCharts from 'apexcharts';
//
// export const mergeOptions = (
//     baseOptions: ApexCharts.ApexOptions,
//     overrides: ApexCharts.ApexOptions,
// ): ApexCharts.ApexOptions => {
//     const merged: ApexCharts.ApexOptions = { ...baseOptions };
//
//     Object.keys(overrides).forEach((key) => {
//         const typedKey = key as keyof ApexCharts.ApexOptions;
//         if (
//             typeof overrides[typedKey] === 'object' &&
//             !Array.isArray(overrides[typedKey]) &&
//             overrides[typedKey] !== null
//         ) {
//             merged[typedKey] = {
//                 ...(baseOptions[typedKey] || {}),
//                 ...(overrides[typedKey] || {}),
//             };
//         } else {
//             merged[typedKey] = overrides[typedKey];
//         }
//     });
//
//     return merged;
// };

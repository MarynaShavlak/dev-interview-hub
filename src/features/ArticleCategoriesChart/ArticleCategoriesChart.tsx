// import React from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
// import { Card } from '../../../redesigned/Card';
// import { Card as CardDeprecated } from '../../../deprecated/Card';
//
// export const DonutChart = () => {
//     const series = [44, 55, 13, 43, 22];
//
//     const fontFamily = toggleFeatures({
//         name: 'isAppRedesigned',
//         on: () => 'Nunito Sans", sans-serif',
//         off: () => 'Times New Roman", serif',
//     });
//
//     const headerColor = toggleFeatures({
//         name: 'isAppRedesigned',
//         on: () => '#141c1f',
//         off: () => '#0232c2',
//     });
//
//     const chartOptions = {
//         chart: {
//             width: '100%',
//         },
//         labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
//         title: {
//             text: 'Article Categories, %',
//             align: 'left' as const,
//             style: {
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 fontFamily,
//                 // color: headerColor,
//             },
//         },
//         // fill: {
//         //     colors: ['#5ed3f3', '#e2eef1', '#00c8ff', '#adbcc0'],
//         // },
//         legend: {
//             fontFamily,
//         },
//         stroke: {
//             show: false,
//         },
//         theme: {
//             mode: 'dark' as const,
//             palette: 'palette1',
//             monochrome: {
//                 enabled: true,
//                 color: '#5ed3f3',
//                 shadeTo: 'dark' as const,
//                 shadeIntensity: 0.9,
//             },
//         },
//     };
//
//     return (
//         <ToggleFeaturesComponent
//             feature="isAppRedesigned"
//             on={
//                 <Card padding="0">
//                     <ReactApexChart
//                         series={series}
//                         type="donut"
//                         width={400}
//                         // height="400"
//                         options={chartOptions}
//                     />
//                 </Card>
//             }
//             off={
//                 <CardDeprecated>
//                     <ReactApexChart
//                         series={series}
//                         type="donut"
//                         width={400}
//                         // height="400"
//                         options={chartOptions}
//                     />
//                 </CardDeprecated>
//             }
//         />
//     );
// };

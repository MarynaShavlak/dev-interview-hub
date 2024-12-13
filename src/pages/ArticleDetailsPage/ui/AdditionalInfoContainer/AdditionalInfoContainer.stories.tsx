export {};
// import { ComponentMeta, ComponentStory } from '@storybook/react';
// import { AdditionalInfoContainer } from './AdditionalInfoContainer';
// import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
// import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
// import { withI18nDecorator } from '@/shared/config/storybook/withI18nDecorator/withI18nDecorator';
// import { testArticleData } from '@/entities/Article/testing';
//
// export default {
//     title: 'pages/ArticleDetailsPage/AdditionalInfoContainer',
//     component: AdditionalInfoContainer,
//     decorators: [NewDesignDecorator, withI18nDecorator],
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as ComponentMeta<typeof AdditionalInfoContainer>;
//
// const Template: ComponentStory<typeof AdditionalInfoContainer> = (args) => (
//     <AdditionalInfoContainer />
// );
// export const Loading = Template.bind({});
// Loading.args = {};
// Loading.decorators = [
//     StoreDecorator({
//         articleDetails: {
//             isLoading: true,
//         },
//     }),
// ];
//
// export const Loaded = Template.bind({});
// Loaded.args = {};
// Loaded.decorators = [
//     StoreDecorator({
//         articleDetails: {
//             data: testArticleData,
//             isLoading: false,
//         },
//     }),
// ];

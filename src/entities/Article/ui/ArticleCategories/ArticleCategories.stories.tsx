import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleCategories } from './ArticleCategories';
import { testArticleData } from '../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ArticleCategory } from '../..';

export default {
    title: 'entities/Article/ArticleCategories',
    component: ArticleCategories,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        article: testArticleData,
    },
} as ComponentMeta<typeof ArticleCategories>;

const Template: ComponentStory<typeof ArticleCategories> = (args) => (
    <ArticleCategories {...args} />
);

export const OneCategoryLong = Template.bind({});
OneCategoryLong.args = {
    article: {
        ...testArticleData,
        category: [ArticleCategory.PUBLIC_ADMINISTRATION],
    },
};
export const OneCategoryShort = Template.bind({});
OneCategoryShort.args = {
    article: {
        ...testArticleData,
        category: [ArticleCategory.IT],
    },
};

export const MultipleCategories = Template.bind({});
MultipleCategories.args = {};

export const MultipleCategoriesRedesigned = Template.bind({});
MultipleCategoriesRedesigned.args = {};
MultipleCategoriesRedesigned.decorators = [NewDesignDecorator];

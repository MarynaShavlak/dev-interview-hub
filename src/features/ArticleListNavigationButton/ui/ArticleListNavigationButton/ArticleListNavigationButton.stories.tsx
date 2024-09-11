import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleListNavigationButton } from './ArticleListNavigationButton';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/ArticleListNavigationButton',
    component: ArticleListNavigationButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleListNavigationButton>;

const Template: ComponentStory<typeof ArticleListNavigationButton> = (args) => (
    <ArticleListNavigationButton />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Redesigned = Template.bind({});
Redesigned.args = {};
Redesigned.decorators = [StoreDecorator({}), NewDesignDecorator];

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleEditNavigationButton } from './ArticleEditNavigationButton';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/ArticleEditNavigationButton',
    component: ArticleEditNavigationButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleEditNavigationButton>;

const Template: ComponentStory<typeof ArticleEditNavigationButton> = (args) => (
    <ArticleEditNavigationButton />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Redesigned = Template.bind({});
Redesigned.args = {};
Redesigned.decorators = [StoreDecorator({}), NewDesignDecorator];

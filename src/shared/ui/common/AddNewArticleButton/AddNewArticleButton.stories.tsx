import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddNewArticleButton } from './AddNewArticleButton';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/ArticleCreateNavigationButton',
    component: AddNewArticleButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddNewArticleButton>;

const Template: ComponentStory<typeof AddNewArticleButton> = (args) => (
    <AddNewArticleButton />
);

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [StoreDecorator({})];

export const Redesigned = Template.bind({});
Redesigned.args = {};
Redesigned.decorators = [StoreDecorator({}), NewDesignDecorator];

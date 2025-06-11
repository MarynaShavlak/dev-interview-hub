import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddNewEntityButton } from './AddNewEntityButton';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/ArticleCreateNavigationButton',
    component: AddNewEntityButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddNewEntityButton>;

const Template: ComponentStory<typeof AddNewEntityButton> = (args) => (
    <AddNewEntityButton entityType="article" />
);

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [StoreDecorator({})];

export const Redesigned = Template.bind({});
Redesigned.args = {};
Redesigned.decorators = [StoreDecorator({}), NewDesignDecorator];

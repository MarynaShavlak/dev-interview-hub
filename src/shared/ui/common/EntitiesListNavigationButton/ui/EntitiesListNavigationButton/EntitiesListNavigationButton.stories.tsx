import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EntitiesListNavigationButton } from './EntitiesListNavigationButton';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/ArticleListNavigationButton',
    component: EntitiesListNavigationButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EntitiesListNavigationButton>;

const Template: ComponentStory<typeof EntitiesListNavigationButton> = (
    args,
) => <EntitiesListNavigationButton type="article" />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [StoreDecorator({})];

export const Redesigned = Template.bind({});
Redesigned.args = {};
Redesigned.decorators = [StoreDecorator({}), NewDesignDecorator];

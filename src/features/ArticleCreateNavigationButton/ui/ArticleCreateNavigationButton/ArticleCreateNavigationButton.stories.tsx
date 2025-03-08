import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleCreateNavigationButton } from './ArticleCreateNavigationButton';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/ArticleCreateNavigationButton',
    component: ArticleCreateNavigationButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleCreateNavigationButton>;

const Template: ComponentStory<typeof ArticleCreateNavigationButton> = (
    args,
) => <ArticleCreateNavigationButton />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [StoreDecorator({})];

export const Redesigned = Template.bind({});
Redesigned.args = {};
Redesigned.decorators = [StoreDecorator({}), NewDesignDecorator];

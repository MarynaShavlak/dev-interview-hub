import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticlePageGreeting } from './ArticlePageGreeting';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { testUserData } from '@/entities/User/testing';

export default {
    title: 'features/ArticlePageGreeting',
    component: ArticlePageGreeting,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlePageGreeting>;

const Template: ComponentStory<typeof ArticlePageGreeting> = (args) => (
    <ArticlePageGreeting />
);

const storeDecorator = StoreDecorator({
    user: {
        authData: {
            ...testUserData,
            jsonSettings: { isArticlesPageWasOpened: false },
        },
    },
});

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [storeDecorator];

export const Redesigned = Template.bind({});
Redesigned.args = {};
Redesigned.decorators = [storeDecorator, NewDesignDecorator];

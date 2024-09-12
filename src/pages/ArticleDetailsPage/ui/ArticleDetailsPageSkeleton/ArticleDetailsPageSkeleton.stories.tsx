import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleDetailsPageSkeleton } from './ArticleDetailsPageSkeleton';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPageSkeleton',
    component: ArticleDetailsPageSkeleton,
    decorators: [NewDesignDecorator],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsPageSkeleton>;

const Template: ComponentStory<typeof ArticleDetailsPageSkeleton> = (args) => (
    <ArticleDetailsPageSkeleton />
);

export const Normal = Template.bind({});
Normal.args = {};

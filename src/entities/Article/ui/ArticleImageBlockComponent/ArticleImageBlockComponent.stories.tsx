import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleImageBlockComponent } from './ArticleImageBlockComponent';
import { imageBlock, imageBlockWithInvalidUrl } from '../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ArticleImageBlockComponentSkeleton } from './ArticleImageBlockComponentSkeleton/ArticleImageBlockComponentSkeleton';

export default {
    title: 'entities/Article/ArticleImageBlockComponent',
    component: ArticleImageBlockComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleImageBlockComponent>;

const Template: ComponentStory<typeof ArticleImageBlockComponent> = (args) => (
    <ArticleImageBlockComponent {...args} />
);

export const Default = Template.bind({});
Default.args = { block: imageBlock };

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = { block: imageBlock };
DefaultRedesigned.decorators = [NewDesignDecorator];

export const LoadingState = Template.bind({});
LoadingState.args = { block: imageBlock };
LoadingState.decorators = [() => <ArticleImageBlockComponentSkeleton />];

export const LoadingStateRedesigned = Template.bind({});
LoadingStateRedesigned.args = { block: imageBlock };
LoadingStateRedesigned.decorators = [
    () => <ArticleImageBlockComponentSkeleton />,
    NewDesignDecorator,
];

export const ErrorState = Template.bind({});
ErrorState.args = { block: imageBlockWithInvalidUrl };
export const ErrorStateRedesigned = Template.bind({});
ErrorStateRedesigned.args = { block: imageBlockWithInvalidUrl };
ErrorStateRedesigned.decorators = [NewDesignDecorator];

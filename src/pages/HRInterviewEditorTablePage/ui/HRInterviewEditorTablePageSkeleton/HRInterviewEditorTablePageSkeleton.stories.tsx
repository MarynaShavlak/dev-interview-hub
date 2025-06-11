import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { HRInterviewEditorTablePageSkeleton } from './HRInterviewEditorTablePageSkeleton';

export default {
    title: 'pages/HRInterviewPage/HRInterviewPageSkeleton',
    component: HRInterviewEditorTablePageSkeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof HRInterviewEditorTablePageSkeleton>;

const Template: ComponentStory<
    typeof HRInterviewEditorTablePageSkeleton
> = () => <HRInterviewEditorTablePageSkeleton />;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator];

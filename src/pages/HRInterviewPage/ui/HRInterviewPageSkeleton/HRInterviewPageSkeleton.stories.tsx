import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { HRInterviewPageSkeleton } from './HRInterviewPageSkeleton';

export default {
    title: 'pages/HRInterviewPage/HRInterviewPageSkeleton',
    component: HRInterviewPageSkeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof HRInterviewPageSkeleton>;

const Template: ComponentStory<typeof HRInterviewPageSkeleton> = () => (
    <HRInterviewPageSkeleton />
);

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator];

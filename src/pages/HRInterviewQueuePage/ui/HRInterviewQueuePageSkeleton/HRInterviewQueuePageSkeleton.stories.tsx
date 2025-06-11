import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { HRInterviewQueuePageSkeleton } from './HRInterviewQueuePageSkeleton';

export default {
    title: 'pages/HRInterviewPage/HRInterviewPageSkeleton',
    component: HRInterviewQueuePageSkeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof HRInterviewQueuePageSkeleton>;

const Template: ComponentStory<typeof HRInterviewQueuePageSkeleton> = () => (
    <HRInterviewQueuePageSkeleton />
);

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator];

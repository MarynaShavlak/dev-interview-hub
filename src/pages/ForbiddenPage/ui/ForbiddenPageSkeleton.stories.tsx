import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ForbiddenPageSkeleton } from './ForbiddenPageSkeleton';

export default {
    title: 'pages/ForbiddenPageSkeleton',
    component: ForbiddenPageSkeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ForbiddenPageSkeleton>;

const Template: ComponentStory<typeof ForbiddenPageSkeleton> = () => (
    <ForbiddenPageSkeleton />
);

export const Normal = Template.bind({});
Normal.args = {};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator];

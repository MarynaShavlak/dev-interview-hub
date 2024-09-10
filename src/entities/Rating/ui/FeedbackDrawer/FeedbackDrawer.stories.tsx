import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FeedbackDrawer } from './FeedbackDrawer';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Rating/FeedbackDrawer',
    component: FeedbackDrawer,
    argTypes: {
        feedbackTitle: { control: 'text' },
        isOpen: { control: 'boolean' },
    },
    args: {
        feedbackTitle:
            'Залишіть свій відгук про статтю, це допоможе покращити якість',
        isOpen: false,
    },
} as ComponentMeta<typeof FeedbackDrawer>;

const Template: ComponentStory<typeof FeedbackDrawer> = (args) => {
    const { isOpen: initialOpen, ...otherArgs } = args;
    const [isDrawerOpen, setIsDrawerOpen] = useState(initialOpen);
    const [feedback, setFeedback] = useState('');

    return (
        <>
            <button onClick={() => setIsDrawerOpen(true)} type="button">
                Open Feedback Drawer
            </button>
            <FeedbackDrawer
                {...otherArgs}
                isOpen={isDrawerOpen}
                feedback={feedback}
                setFeedback={setFeedback}
                onSubmitFeedback={() => {
                    setIsDrawerOpen(false);
                }}
                onClose={() => setIsDrawerOpen(false)}
            />
        </>
    );
};

export const Normal = Template.bind({});
Normal.args = {
    isOpen: false,
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
    isOpen: false,
};
NormalRedesigned.decorators = [NewDesignDecorator];

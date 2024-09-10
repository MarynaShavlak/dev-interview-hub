import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FeedbackModal } from './FeedbackModal';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Rating/FeedbackModal',
    component: FeedbackModal,
    argTypes: {
        feedbackTitle: { control: 'text' },
        isOpen: { control: 'boolean' },
    },
    args: {
        feedbackTitle:
            'Залишіть свій відгук про статтю, це допоможе покращити якість',
        isOpen: false,
    },
} as ComponentMeta<typeof FeedbackModal>;

const Template: ComponentStory<typeof FeedbackModal> = (args) => {
    const { isOpen: initialOpen, ...otherArgs } = args;
    const [isModalOpen, setIsModalOpen] = useState(initialOpen);
    const [feedback, setFeedback] = useState('');

    return (
        <>
            <button onClick={() => setIsModalOpen(true)} type="button">
                Відкрити модальне вікно відгуку
            </button>
            <FeedbackModal
                {...otherArgs}
                isOpen={isModalOpen}
                feedback={feedback}
                setFeedback={setFeedback}
                onSubmitFeedback={() => {
                    setIsModalOpen(false);
                }}
                onClose={() => setIsModalOpen(false)}
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

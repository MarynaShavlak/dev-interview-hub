import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '../Text/Text';
import { Card, CardTheme } from './Card';

export default {
    title: 'shared/deprecated/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' },
        theme: {
            control: { type: 'select', options: Object.values(CardTheme) },
        },
        max: { control: 'boolean' },
    },
    args: {
        children: <Text title="Card Title" text="Card content gos here." />,
    },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    theme: CardTheme.NORMAL,
};

export const Outlined = Template.bind({});
Outlined.args = {
    theme: CardTheme.OUTLINED,
};

export const MaxWidth = Template.bind({});
MaxWidth.args = {
    theme: CardTheme.NORMAL,
    max: true,
};

export const OutlinedMaxWidth = Template.bind({});
OutlinedMaxWidth.args = {
    theme: CardTheme.OUTLINED,
    max: true,
};

export const LargeContent = Template.bind({});
LargeContent.args = {
    theme: CardTheme.NORMAL,
    children: (
        <div>
            <Text
                title="Large Content Card"
                text="This card has a large amount of content."
            />
            <p>
                Additional content to demonstrate scrolling or overflow
                handling.
            </p>
            <p>
                Additional content to demonstrate scrolling or overflow
                handling.
            </p>
            <p>
                Additional content to demonstrate scrolling or overflow
                handling.
            </p>
            <p>
                Additional content to demonstrate scrolling or overflow
                handling.
            </p>
            <p>
                Additional content to demonstrate scrolling or overflow
                handling.
            </p>
        </div>
    ),
};

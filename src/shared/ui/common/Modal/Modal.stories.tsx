import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';
import { Text as TextDeprecated } from '../../deprecated/Text';
import { Text } from '../../redesigned/Text';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/common/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
        onClose: { action: 'closed' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

const longText =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi consequatur eligendi impedit incidunt necessitatibus possimus quis saepe sunt totam. '.repeat(
        5,
    );
export const Basic = Template.bind({});
Basic.args = {
    isOpen: true,
    children: <TextDeprecated text="This is a basic modal." />,
};

export const LongText = Template.bind({});
LongText.args = {
    isOpen: true,
    children: <TextDeprecated text={longText} />,
};

export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children: (
        <TextDeprecated text="This modal is displayed with a dark theme." />
    ),
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Redesigned = Template.bind({});
Redesigned.args = {
    isOpen: true,
    children: <Text text="This modal uses the redesigned theme." />,
};
Redesigned.decorators = [NewDesignDecorator];

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FileUploadInput } from './FileUploadInput';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/common/FileUploadInput',
    component: FileUploadInput,
    argTypes: {
        onChange: { action: 'onChange' },
        AddFileElement: { control: 'text' },
        className: { control: 'text' },
    },
} as ComponentMeta<typeof FileUploadInput>;

const Template: ComponentStory<typeof FileUploadInput> = (args) => {
    return (
        <div
            style={{
                width: '100px',
                height: '100px',
                margin: 'auto',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <FileUploadInput {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    onChange: action('File changed'),
};

export const WithCustomAddFileElement = Template.bind({});
WithCustomAddFileElement.args = {
    onChange: action('File changed'),
    AddFileElement: <span>Add custom file</span>,
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    onChange: action('File changed'),
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const Redesigned = Template.bind({});
Redesigned.args = {
    onChange: action('File changed'),
};
Redesigned.decorators = [NewDesignDecorator];

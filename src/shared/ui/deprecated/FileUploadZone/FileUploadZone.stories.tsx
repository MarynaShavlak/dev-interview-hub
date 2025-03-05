import React, { ChangeEvent } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FileUploadZone } from './FileUploadZone';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/deprecated/FileUploadZone',
    component: FileUploadZone,
    argTypes: {
        imagePreview: { control: 'text' },
        className: { control: 'text' },
    },
    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },
} as ComponentMeta<typeof FileUploadZone>;

const Template: ComponentStory<typeof FileUploadZone> = (args) => {
    const { imagePreview } = args;
    return (
        <div
            style={{
                width: '400px',
                height: '300px',
                margin: 'auto',
                position: 'relative',
            }}
        >
            <img
                src={imagePreview || ''}
                style={{
                    width: '400px',
                    height: '300px',

                    position: 'absolute',
                    top: '0',
                    left: '0',
                }}
            />
            <FileUploadZone {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    imagePreview: null,
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log('File changed:', file);
                console.log('Preview URL:', reader.result);
            };
            reader.readAsDataURL(file);
        }
    },
    resetImage: () => {
        console.log('Reset Image');
    },
};

export const WithImagePreview = Template.bind({});
WithImagePreview.args = {
    height: '300px',
    width: '400px',
    imagePreview:
        'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png',
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log('File changed:', file);
                console.log('Preview URL:', reader.result);
            };
            reader.readAsDataURL(file);
        }
    },
    resetImage: () => {
        console.log('Reset Image');
    },
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
    imagePreview: null,
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log('File changed:', file);
                console.log('Preview URL:', reader.result);
            };
            reader.readAsDataURL(file);
        }
    },
    resetImage: () => {
        console.log('Reset Image');
    },
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithImagePreviewDarkTheme = Template.bind({});
WithImagePreviewDarkTheme.args = {
    height: '300px',
    width: '400px',
    imagePreview:
        'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png',
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log('File changed:', file);
                console.log('Preview URL:', reader.result);
            };
            reader.readAsDataURL(file);
        }
    },
    resetImage: () => {
        console.log('Reset Image');
    },
};
WithImagePreviewDarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

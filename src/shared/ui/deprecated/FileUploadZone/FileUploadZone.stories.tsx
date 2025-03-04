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
} as ComponentMeta<typeof FileUploadZone>;

const Template: ComponentStory<typeof FileUploadZone> = (args) => (
    <FileUploadZone {...args} />
);

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

import React, { ChangeEvent } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FileUploadZone } from './FileUploadZone';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/FileUploadZone',
    component: FileUploadZone,
    argTypes: {
        backgroundColor: { control: 'color' },
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
    decorators: [NewDesignDecorator],
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
                overflow: 'hidden',
            }}
        >
            {imagePreview && (
                <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                        width: '400px',
                        height: '300px',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                    }}
                />
            )}
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

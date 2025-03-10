import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ImageEditorForm } from './ImageEditorForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/ImageEditorForm',
    component: ImageEditorForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ImageEditorForm>;

const Template: ComponentStory<typeof ImageEditorForm> = (args) => (
    <ImageEditorForm {...args} />
);

const baseArgs = {
    title: 'Image Title',
    handleTitleChange: (value: string) => console.log('Title changed:', value),
    onSave: () => console.log('Save clicked'),
    onDelete: () => console.log('Delete clicked'),
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        console.log('Image changed'),
    resetImage: () => console.log('Reset image clicked'),
};

const noImageArgs = {
    ...baseArgs,
    hasNoValidImage: true,
    preview: null,
    imageTypeError: null,
};

const withPreviewArgs = {
    ...baseArgs,
    hasNoValidImage: false,
    preview:
        'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png',
    imageTypeError: null,
};

export const Default = Template.bind({});
Default.args = noImageArgs;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = noImageArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];

export const WithImagePreview = Template.bind({});
WithImagePreview.args = withPreviewArgs;

export const WithImagePreviewRedesigned = Template.bind({});
WithImagePreviewRedesigned.args = withPreviewArgs;
WithImagePreviewRedesigned.decorators = [NewDesignDecorator];

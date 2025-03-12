import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ImageBlockEditor } from './ImageBlockEditor';
import { imageBlock } from '@/entities/Article/testing';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ImageUploadError } from '../ImageUploadError/ImageUploadError';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'widgets/ImageBlockEditor',
    component: ImageBlockEditor,
    argTypes: {},
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ImageBlockEditor>;

const Template: ComponentStory<typeof ImageBlockEditor> = (args) => (
    <ImageBlockEditor {...args} />
);

const commonArgs = {
    addBlockInArticle: () => {},
    deleteBlockFromArticle: () => {},
    onEditBlock: () => {},
};

export const Default = Template.bind({});
Default.args = {
    block: imageBlock,
    ...commonArgs,
};

export const EditingMode = Template.bind({});
EditingMode.args = {
    block: { ...imageBlock, src: '' },
    ...commonArgs,
};

export const UploadErrorState = Template.bind({});
UploadErrorState.args = {
    block: { ...imageBlock, src: '' },
    ...commonArgs,
};
UploadErrorState.decorators = [
    () => (
        <ImageUploadError onRetry={() => console.log('Upload Error Reset')} />
    ),
];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {
    block: imageBlock,
    ...commonArgs,
};
DefaultRedesigned.decorators = [NewDesignDecorator];

export const EditingModeRedesigned = Template.bind({});
EditingModeRedesigned.args = {
    block: { ...imageBlock, src: '' },
    ...commonArgs,
};
EditingModeRedesigned.decorators = [NewDesignDecorator];
export const UploadErrorStateRedesigned = Template.bind({});
UploadErrorStateRedesigned.args = {
    block: { ...imageBlock, src: '' },
    ...commonArgs,
};
UploadErrorStateRedesigned.decorators = [
    () => (
        <ImageUploadError onRetry={() => console.log('Upload Error Reset')} />
    ),
    NewDesignDecorator,
];

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    ImageBlockDisplay,
    ImageBlockDisplayProps,
} from '../ImageBlockDisplay/ImageBlockDisplay';
import { imageBlock } from '@/entities/Article/testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { withPreviewArgs } from '@/features/ImageEditorForm/testing';

export default {
    title: 'widgets/ImageBlockEditor/ImageBlockDisplay',
    component: ImageBlockDisplay,
    argTypes: {
        onDelete: { action: 'onDelete' }, // Define action for onDelete
    },
} as ComponentMeta<typeof ImageBlockDisplay>;

const Template: ComponentStory<typeof ImageBlockDisplay> = (args) => (
    <ImageBlockDisplay {...args} />
);

const baseArgs: ImageBlockDisplayProps = {
    isEditArticlePage: true,
    isEditing: true,
    formProps: withPreviewArgs,
    viewerProps: {
        block: imageBlock,
        editBlock: () => console.log('Edit block clicked'),
    },
    onDelete: () => console.log('Delete block clicked'),
};

export const Default = Template.bind({});
Default.args = {
    ...baseArgs,
};

export const NonEditMode = Template.bind({});
NonEditMode.args = {
    ...baseArgs,
    isEditing: false,
};

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {
    ...baseArgs,
};
DefaultRedesigned.decorators = [NewDesignDecorator];
export const NonEditModeRedesigned = Template.bind({});
NonEditModeRedesigned.args = {
    ...baseArgs,
    isEditing: false,
};
NonEditModeRedesigned.decorators = [NewDesignDecorator];

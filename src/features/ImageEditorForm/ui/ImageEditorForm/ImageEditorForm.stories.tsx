import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ImageEditorForm } from './ImageEditorForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import {
    noImageArgs,
    withEmptyTitle,
    withImageTypeError,
    withLongTitle,
    withPreviewArgs,
} from '../../testing';

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

export const WithEmptyTitle = Template.bind({});
WithEmptyTitle.args = withEmptyTitle;

export const WithEmptyTitleRedesigned = Template.bind({});
WithEmptyTitleRedesigned.args = withEmptyTitle;
WithEmptyTitleRedesigned.decorators = [NewDesignDecorator];

export const WithImageTypeError = Template.bind({});
WithImageTypeError.args = withImageTypeError;

export const WithImageTypeErrorRedesigned = Template.bind({});
WithImageTypeErrorRedesigned.args = withImageTypeError;
WithImageTypeErrorRedesigned.decorators = [NewDesignDecorator];

export const WithLongTitle = Template.bind({});
WithLongTitle.args = withLongTitle;

export const WithLongTitleRedesigned = Template.bind({});
WithLongTitleRedesigned.args = withLongTitle;
WithLongTitleRedesigned.decorators = [NewDesignDecorator];

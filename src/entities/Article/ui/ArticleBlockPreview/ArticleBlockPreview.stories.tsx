import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ArticleBlockPreview } from './ArticleBlockPreview';
import {
    codeBlockWithTitle,
    imageBlock,
    textBlockWithTitleAndFewParagraphs,
} from '../../testing';
import {
    ArticleCodeBlock,
    ArticleImageBlock,
    ArticleTextBlock,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../../ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleCodeBlockComponent, ArticleImageBlockComponent } from '../..';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

// Default export for Storybook
export default {
    title: 'entities/Article/ArticleBlockPreview',
    component: ArticleBlockPreview,
    argTypes: {
        editBlock: { action: 'edited block' },
        deleteBlock: { action: 'deleted block' },
    },
} as ComponentMeta<typeof ArticleBlockPreview>;

const TextBlockComponentWrapper = ({ block }: { block: ArticleTextBlock }) => (
    <ArticleTextBlockComponent block={block} withTags />
);
const CodeBlockComponentWrapper = ({ block }: { block: ArticleCodeBlock }) => (
    <ArticleCodeBlockComponent block={block} />
);
const ImageBlockComponentWrapper = ({
    block,
}: {
    block: ArticleImageBlock;
}) => <ArticleImageBlockComponent block={block} />;

const textArgs = {
    block: textBlockWithTitleAndFewParagraphs,
    editBlock: action('editBlock'),
    deleteBlock: action('deleteBlock'),
    BlockComponent: TextBlockComponentWrapper,
};
const codeArgs = {
    block: codeBlockWithTitle,
    editBlock: action('editBlock'),
    deleteBlock: action('deleteBlock'),
    BlockComponent: CodeBlockComponentWrapper,
};
const imageArgs = {
    block: imageBlock,
    editBlock: action('editBlock'),
    deleteBlock: action('deleteBlock'),
    BlockComponent: ImageBlockComponentWrapper,
};

const TemplateText: ComponentStory<
    typeof ArticleBlockPreview<ArticleTextBlock>
> = (args) => <ArticleBlockPreview<ArticleTextBlock> {...args} />;

const TemplateCode: ComponentStory<
    typeof ArticleBlockPreview<ArticleCodeBlock>
> = (args) => <ArticleBlockPreview<ArticleCodeBlock> {...args} />;

const TemplateImage: ComponentStory<
    typeof ArticleBlockPreview<ArticleImageBlock>
> = (args) => <ArticleBlockPreview<ArticleImageBlock> {...args} />;

export const TextBlockPreview = TemplateText.bind({});
TextBlockPreview.args = textArgs;

export const CodeBlockPreview = TemplateCode.bind({});
CodeBlockPreview.args = codeArgs;

export const ImageBlockPreview = TemplateImage.bind({});
ImageBlockPreview.args = imageArgs;

export const TextBlockPreviewRedesigned = TemplateText.bind({});
TextBlockPreviewRedesigned.args = textArgs;
TextBlockPreviewRedesigned.decorators = [NewDesignDecorator];

export const CodeBlockPreviewRedesigned = TemplateCode.bind({});
CodeBlockPreviewRedesigned.args = codeArgs;
CodeBlockPreviewRedesigned.decorators = [NewDesignDecorator];

export const ImageBlockPreviewRedesigned = TemplateImage.bind({});
ImageBlockPreviewRedesigned.args = imageArgs;
ImageBlockPreviewRedesigned.decorators = [NewDesignDecorator];
//
// // Story for rendering the ArticleBlockPreview with a custom BlockComponent
// export const CustomBlockComponent = Template.bind({});
// CustomBlockComponent.args = {
//     block: exampleBlock,
//     editBlock: action('editBlock'),
//     deleteBlock: action('deleteBlock'),
//     BlockComponent: (props: { block: typeof exampleBlock }) => (
//         <div>
//             <h3>{props.block.title}</h3>
//             <p>{props.block.content}</p>
//         </div>
//     ),
// };
//
// // Story for the scenario when the edit and delete buttons are clicked
// export const EditAndDeleteActions = Template.bind({});
// EditAndDeleteActions.args = {
//     block: exampleBlock,
//     editBlock: action('editBlock'),
//     deleteBlock: action('deleteBlock'),
//     BlockComponent: TextBlockComponent,
// };

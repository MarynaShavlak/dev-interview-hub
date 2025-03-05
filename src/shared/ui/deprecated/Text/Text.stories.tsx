import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Text, TextSize, TextTheme, TextAlign } from './Text';

export default {
    title: 'shared/deprecated/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
        align: {
            control: {
                type: 'radio',
                options: [TextAlign.LEFT, TextAlign.CENTER, TextAlign.RIGHT],
            },
        },
        size: {
            control: {
                type: 'radio',
                options: [TextSize.S, TextSize.M, TextSize.L],
            },
        },
        theme: {
            control: {
                type: 'radio',
                options: [
                    TextTheme.PRIMARY,
                    TextTheme.INVERTED,
                    TextTheme.ERROR,
                ],
            },
        },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
};

export const Error = Template.bind({});
Error.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    theme: TextTheme.ERROR,
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'Title lorem ipsun',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
    text: 'Description Description Description Description',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
    title: 'Title lorem ipsun',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
    text: 'Description Description Description Description',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeXS = Template.bind({});
SizeXS.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    size: TextSize.XS,
};
export const SizeS = Template.bind({});
SizeS.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    size: TextSize.S,
};
export const SizeM = Template.bind({});
SizeM.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    size: TextSize.M,
};

export const SizeL = Template.bind({});
SizeL.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    size: TextSize.L,
};

export const AlignCenter = Template.bind({});
AlignCenter.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    align: TextAlign.CENTER,
};

export const AlignRight = Template.bind({});
AlignRight.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    align: TextAlign.RIGHT,
};

export const WithTags = Template.bind({});
WithTags.args = {
    title: 'Text with Tags',
    text: '<strong>This text includes HTML tags</strong>',
    withTags: true,
};

export const WithRenderTags = Template.bind({});
WithRenderTags.args = {
    title: 'Text with Tags',
    text:
        '<pre>' +
        '// Here tag pre is rendered' +
        '\n' +
        'export const WithRenderTags = Template.bind({});\n' +
        'WithRenderTags.args = {\n' +
        "    title: 'Text with Tags',\n" +
        "    text: '<pre>This text includes HTML tags</pre>',\n" +
        '    withTags: false,\n' +
        '};</pre>',
    withTags: false,
};

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AppImage } from './AppImage';
import { Text, TextTheme } from '../../deprecated/Text';
import { Text as TextRedesigned } from '../../redesigned/Text';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/common/AppImage',
    component: AppImage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppImage>;

const Template: ComponentStory<typeof AppImage> = (args) => (
    <AppImage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    src: 'https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif',
    alt: 'Normal image',
    className: 'normal-image-class',
    width: 200,
    height: 200,
};

export const WithErrorFallback = Template.bind({});
WithErrorFallback.decorators = [
    () => <Text text="Failed to load image" theme={TextTheme.ERROR} />,
];

export const WithErrorFallbackRedesigned = Template.bind({});
// WithErrorFallbackRedesigned.args = {
//     src: 'invalid-url',
//     alt: 'Image with error fallback',
//     fallback: <SkeletonRedesigned width={400} height={300} />,
//     errorFallback: (
//         <TextRedesigned text="Failed to load image" variant="error" />
//     ),
// };
WithErrorFallbackRedesigned.decorators = [
    () => <TextRedesigned text="Failed to load image" variant="error" />,
    NewDesignDecorator,
];

export const LargeImage = Template.bind({});
LargeImage.args = {
    src: 'https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif',
    alt: 'Large image',
    className: 'large-image-class',
    width: 400,
    height: 400,
};

export const SmallImage = Template.bind({});
SmallImage.args = {
    src: 'https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif',
    alt: 'Small image',
    className: 'small-image-class',
    width: 100,
    height: 100,
};

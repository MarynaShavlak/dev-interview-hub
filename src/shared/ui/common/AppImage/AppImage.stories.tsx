import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AppImage } from './AppImage';
import { Skeleton } from '../../deprecated/Skeleton';
import { Text, TextTheme } from '../../deprecated/Text';
import { Skeleton as SkeletonRedesigned } from '../../redesigned/Skeleton';
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
    src: 'https://via.placeholder.com/400x300',
    alt: 'Normal image',
    className: 'normal-image-class',
};

export const WithErrorFallback = Template.bind({});
WithErrorFallback.args = {
    src: 'invalid-url',
    alt: 'Image with error fallback',
    fallback: <Skeleton width={400} height={300} />,
    errorFallback: <Text text="Failed to load image" theme={TextTheme.ERROR} />,
};

export const WithErrorFallbackRedesigned = Template.bind({});
WithErrorFallbackRedesigned.args = {
    src: 'invalid-url',
    alt: 'Image with error fallback',
    fallback: <SkeletonRedesigned width={400} height={300} />,
    errorFallback: (
        <TextRedesigned text="Failed to load image" variant="error" />
    ),
};
WithErrorFallbackRedesigned.decorators = [NewDesignDecorator];

export const LargeImage = Template.bind({});
LargeImage.args = {
    src: 'https://via.placeholder.com/800x600',
    alt: 'Large image',
    className: 'large-image-class',
};

export const SmallImage = Template.bind({});
SmallImage.args = {
    src: 'https://via.placeholder.com/100x100',
    alt: 'Small image',
    className: 'small-image-class',
};

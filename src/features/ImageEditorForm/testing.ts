import React from 'react';

const baseArgs = {
    title: 'Image Title',
    handleTitleChange: (value: string) => console.log('Title changed:', value),
    onSave: () => console.log('Save clicked'),
    onDelete: () => console.log('Delete clicked'),
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        console.log('Image changed'),
    resetImage: () => console.log('Reset image clicked'),
    preview:
        'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png',
};

export const noImageArgs = {
    ...baseArgs,
    hasNoValidImage: true,
    preview: null,
    imageTypeError: null,
};

export const withPreviewArgs = {
    ...baseArgs,
    hasNoValidImage: false,
    imageTypeError: null,
};
export const withEmptyTitle = {
    ...baseArgs,
    title: '',
    hasNoValidImage: false,
    imageTypeError: null,
};
export const withImageTypeError = {
    ...baseArgs,
    hasNoValidImage: true,
    preview: null,
    imageTypeError:
        'Некоректний тип зображення. Завантажте файл у форматі PNG, JPG або JPEG.',
};
export const withLongTitle = {
    ...baseArgs,
    title: 'This is a very long image title that has more tha 50 allowed characters.',
    hasNoValidImage: false,

    imageTypeError: null,
};

// import { Story } from '@storybook/react';
//
// export const AlignCenterDecorator = (StoryComponent: Story) => (
//     <div
//         style={{
//             transform: 'translate(-50%, -50%)',
//             top: '50%',
//             left: '50%',
//             position: 'absolute',
//         }}
//     >
//         <StoryComponent />
//     </div>
// );
//
// export const AlignRightDecorator = (StoryComponent: Story) => (
//     <div
//         style={{
//             top: '20px',
//             right: '20px',
//             position: 'absolute',
//         }}
//     >
//         <StoryComponent />
//     </div>
// );

import { Story } from '@storybook/react';
import React from 'react';

type Alignment = 'center' | 'right';

// Higher-order function to create alignment decorators
const AlignDecorator = (alignment: Alignment) => (StoryComponent: Story) => {
    const style: React.CSSProperties = {
        position: 'absolute',
        ...(alignment === 'center' && {
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
        }),
        ...(alignment === 'right' && {
            top: '20px',
            right: '20px',
        }),
    };

    return (
        <div style={style}>
            <StoryComponent />
        </div>
    );
};

export default AlignDecorator;

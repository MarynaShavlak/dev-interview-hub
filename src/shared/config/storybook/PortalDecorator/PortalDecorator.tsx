import { Story } from '@storybook/react';
import React from 'react';

export const PortalDecorator = (StoryComponent: Story) => {
    return (
        <div className="app_redesigned">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&family=Roboto:wght@400;500;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <div id="app" className="app_redesigned">
                <StoryComponent />
            </div>
        </div>
    );
};

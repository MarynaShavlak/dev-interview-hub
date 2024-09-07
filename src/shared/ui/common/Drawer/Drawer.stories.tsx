import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Drawer } from './Drawer';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/common/Drawer',
    component: Drawer,
    argTypes: {
        isOpen: { control: 'boolean' },
    },
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => {
    const { isOpen, onClose, ...otherArgs } = args;
    const [isDrawerOpen, setIsDrawerOpen] = useState(isOpen);

    return (
        <>
            <button onClick={() => setIsDrawerOpen(true)} type="button">
                Open Drawer
            </button>
            <Drawer
                {...otherArgs}
                isOpen={isDrawerOpen}
                onClose={() => {
                    setIsDrawerOpen(false);
                    if (onClose) {
                        onClose();
                    }
                }}
            />
        </>
    );
};

export const Normal = Template.bind({});
Normal.args = {
    isOpen: false,
    children: 'Drawer Content',
    className: 'drawerDeprecated',
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
    isOpen: false,
    children: 'Drawer Content',
    className: 'drawerRedesigned',
};
NormalRedesigned.decorators = [NewDesignDecorator];

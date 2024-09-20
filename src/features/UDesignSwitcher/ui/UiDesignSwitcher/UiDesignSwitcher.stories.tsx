import { ComponentMeta, ComponentStory } from '@storybook/react';
import { UiDesignSwitcher } from './UiDesignSwitcher';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/UiDesignSwitcher',
    component: UiDesignSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof UiDesignSwitcher>;

const Template: ComponentStory<typeof UiDesignSwitcher> = (args) => (
    <UiDesignSwitcher {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator];
